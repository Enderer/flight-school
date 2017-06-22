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
