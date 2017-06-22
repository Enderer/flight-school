import * as _ from 'lodash';
import { Mark } from '../models/mark';

export interface Score {
    id: string;
    count: number;
    attempts: number;
    misses: number;
    throws: number;
    mark: Mark;
}


export class Turn {
    /** List of marks hit this turn */
    throws: Throw[] = [];

    /** First mark to be hit at the start of the turn */
    start: Mark;

    /** Marks thrown at this turn */
    target: Target;
}

/** A single throw by a player */
export class Throw {
    constructor(
        public mark: Mark = null, 
        public target: Mark = null) {}
}


export const getScores = (turns: Turn[], marks: Mark[]): {[id: string]: Score} => {
    console.debug('PageBase::getScores');

    const scores = _(marks)
        .keyBy(m => m.id)
        .mapValues((m: Mark) => { 
            return <Score>{ 
                id: m.id, 
                count: 0, 
                mark: m ,
                attempts: 0,
                throws: 0,
                misses: 0
            }; 
        })
        .value();


    turns = turns || [];
    turns.forEach(turn => {

        const first = turn.target && turn.target.first ?  turn.target.first : null;

        let isMiss = true;

        turn.throws.forEach((t: Throw) => { 
            // Get the mark hit on this turn
            // If not mark was hit don't score anything
            const mark: Mark = t.mark;
            if (mark == null) { return; }

            // Get the score record for this mark
            const score = scores[mark.id];
            if (!score) { return; }

            // Mark was hit, increment the score
            score.count++;
            isMiss = false;

            // If the second or third target
            // was hit increment the attempts
            if (first && first.id !== mark.id) {
                score.attempts++;
            }
        });

        let firstScore = null;

        if (first) { 
            firstScore = scores[first.id];
            if (firstScore) { 
                firstScore.attempts++; 
                if (isMiss) {
                    firstScore.misses++;
                }
            }

        }

    });

    const val: Score[] = _.values(scores).map(s => <Score>s);
    return _.keyBy(val, v => v.id);
};

export class Target {
    first: Mark;
    second: Mark;
    third: Mark;
}

export class Selected {
    first: boolean;
    second: boolean;
    third: boolean;  
}

export const emptyTarget: Target = {
    first: null,
    second: null,
    third: null
};

const nextTarget = (marks: Mark[]): Target => {
    const target = new Target();
    target.first = marks[0] || null;
    target.second = marks[1] || null;
    target.third = marks[2] || null;
    return target;
};

const getLastHit = (turn: Turn): Mark => {
    const lastHit = _(turn.throws).filter(t => !!t.mark).last();
    let mark = turn.start;
    if (lastHit) { mark = lastHit.mark; }
    return mark;
};

const orderMarks = (marks: Mark[], mark: Mark): Mark[] => {
    marks = marks.concat([]);
    let i = _.findIndex(marks, m => m.id === mark.id);
    i = Math.max(i, 0);
    i++;
    const reordered = marks.concat(marks.splice(0, i));
    return reordered;
};

const activeMarks = (marks: Mark[], turns: Turn[], count: number): Mark[] => {

    const hits = _(turns)
        .map(t => t.throws)
        .flatten()
        .map((t: Throw) => t.mark)
        .compact()
        .map(m => m.id)
        .countBy()
        .value();
    
    return marks.filter(m => {
        return !(hits[m.id] >= count);
    });

};

export const getTarget = (marks: Mark[], turns: Turn[], count: number): Target => {

    const lastTurn = _.last(turns);
    if (lastTurn == null) { return nextTarget(marks); }

    const lastMark = getLastHit(lastTurn);
    const ordered = orderMarks(marks, lastMark);
    const active = activeMarks(ordered, turns, count);
    const target = nextTarget(active);
    return target;
};



export const getTarget2 = (marks: Mark[], turns: Turn[], count: number): Target => {

    interface ScoreMap {[id: string]: number; };

    const hits = _(turns)
        .map(t => t.throws)
        .flatten()
        .filter((t: Throw) => t.mark)
        .value();

    const scores = hits.reduce<ScoreMap>((prev, current: Throw, i, t) => {
        prev[current.mark.id] = prev[current.mark.id] || 0;
        prev[current.mark.id]++;
        return prev;
    }, {});

    const lastTurn = _.last(turns);
    let t = 0;

    if (lastTurn) {
        t = _.findIndex(marks, m => lastTurn.start);
        const lastThrow = _(lastTurn.throws).filter(th => !!th.mark).last();
        if (lastThrow && lastThrow.mark) {
            t = _.findIndex(marks, m => lastThrow.mark);
        }
    }
    t = Math.max(t, 1);
    const ms = _.clone(marks);
    const nextMarks1 = ms.concat(ms.splice(0, t));
    const nextMarks = nextMarks1.filter(mark => !(scores[mark.id] >= count));
    const nextTarget = new Target();
    nextTarget.first = nextMarks[0] || null;
    nextTarget.second = nextMarks[1] || null;
    nextTarget.third = nextMarks[2] || null;
    return nextTarget;
};

export const getTarget1 = (marks: Mark[], turns: Turn[]): Target => {

    console.log('getTarget', marks, turns);

    if (!(marks && marks.length)) { return emptyTarget; }
        
    const lastTurn = _.last(turns);
    
    let t = 0;
    let nextMarks = [...marks];

    if (lastTurn != null) {

        const throws = lastTurn.throws;
        const target = lastTurn.target;
        const first = target.first;
        const second = target.second;
        const third = target.third;

        // Reorder the marks in the order they should be hit
        const i = _.findIndex(marks, m => first && m.id === first.id);
        if (i >= 0) {
            nextMarks = nextMarks.concat(nextMarks.splice(0, i));
        }
        if (lastTurn.throws.some(th => th.mark && first && th.mark.id === first.id)) { t++; }
        if (lastTurn.throws.some(th => th.mark && second && th.mark.id === second.id)) { t++; }
        if (lastTurn.throws.some(th => th.mark && third && th.mark.id === third.id)) { t++; }

        t = Math.max(t, 1);
    }

    

    nextMarks = nextMarks.concat(nextMarks.splice(0, t));

    const nextTarget = new Target();
    nextTarget.first = nextMarks[0] || null;
    nextTarget.second = nextMarks[1] || null;
    nextTarget.third = nextMarks[2] || null;
    return nextTarget;

};
