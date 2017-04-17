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
