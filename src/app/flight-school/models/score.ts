import * as _ from 'lodash';
import { Mark } from '../models/mark';

export interface Score {
    id: string;
    count: number;
}


export class Turn {
    /** List of marks hit this turn */
    throws: Throw[];

    /** First mark to be hit at the start of the turn */
    start: number;

    /** Marks thrown at this turn */
    target: Target;
}

/** A single throw by a player */
export class Throw {

    /** Mark hit this turn */
    mark: Mark;
}


export const getScores = (turns: Turn[], marks: Mark[]): {[id: string]: Score} => {
    console.debug('PageBase::getScores');
    const scores = _(marks)
        .keyBy(m => m.id)
        .mapValues((m: Mark) => { return <Score>{ id: m.id, count: 0 }; })
        .value();

    turns.forEach(turn => {
        turn.throws.forEach((t: Throw) => {  
            const mark: Mark = null;  
            if (mark == null) { return; }
            scores[mark.id].count++;
        });
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

export const getTarget = (marks: Mark[], turns: Turn[]): Target => {
    console.log('getTarget', marks, turns);

    if (!(marks && marks.length)) { return emptyTarget; }
        
    const lastTurn = _.last(turns);
    
    let t = 0;
    let nextMarks = marks;

    if (lastTurn != null) {
        const target = lastTurn.target;
        const first = target.first;

        // Reorder the marks in the order they should be hit
        const i = _.findIndex(marks, m => m.id === first.id);
        nextMarks = marks.concat(marks.splice(0, i));

        lastTurn.throws.forEach(th1 => {
            if (th1.mark && nextMarks[t] && th1.mark.id === nextMarks[t].id) {
                t++;
            }
        });
    }

    const nextTarget = new Target();
    nextTarget.first = nextMarks[t] || null;
    nextTarget.second = nextMarks[t + 1] || null;
    nextTarget.third = nextMarks[t + 2] || null;
    return nextTarget;

};
