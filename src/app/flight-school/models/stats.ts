import * as _ from 'lodash';
import { Turn, Score, Throw } from '../models/score';
import { Mark } from '../models/mark';
import * as ScoreModule from '../models/score';
import { Duration } from 'moment';
import * as moment from 'moment';


export class Stats {
    turns = 0;
    throws = 0;
    hits = 0;
    rounds = 0;
    turnHits = 0;
    turnMisses = 0;
    startTime: Date;
    endTime: Date;
    marks = 0;
    required = 0;
    markCounts: MarkCounts = {};

    get misses() { return this.throws - this.hits; }
    get turnHitPercent() { return this.turnHits / this.turns; }
    get totalMarks() { return this.marks * this.required; }
    get remainingMarks() { return Math.max(0, this.totalMarks - this.hits); }
    get hitsPerThrow() { return this.hits / this.throws; }
    get missesPerThrow() { return this.misses / this.throws; }
    get hitsPerTurn() { return this.hits / this.throws; }
    get missesPerTurn() { return this.misses / this.throws; }
    get throwsPerHit() { return this.hits / this.throws; }
    get turnsPerHit() { return this.hits / this.throws; }
    get duration() { 
        if (this.endTime == null || this.startTime == null) { return null; }
        return this.endTime.valueOf() - this.startTime.valueOf(); 
    }
}



export function reduceRoundsTurn(attempts, turn: Turn): any {
    const updated = turn.throws.reduce((a, t) => {
        const id = t.mark.id;
        a[id] = a[id] || 0;
        a[id]++;
        return a;
    }, attempts);

    return updated;
}

export const rounds = (turns: Turn[]): number => {
    const r = turns.reduce(reduceRoundsTurn, {});
    const arr = _.values(r);
    const max = Math.max(...arr);
    return max;
};

export const getRoundCount = (scores: {[id: string]: Score}): number => {
    const attempts = _.values(scores).map(s => s.attempts);
    const r = Math.max(...attempts);
    return r;
};

export const reduceStats = (stats: Stats, turn: Turn) => {
    stats.turns += 1;
    stats.throws += turn.throws.length;

};

export interface MarkTarget {
    markId: string;
    hit: boolean;
}

export interface Turn1 {
    timestamp: Date;
    targets: MarkTarget[];
}

const isHit = (mark: Mark, turn: Turn): boolean => {
    const hit = _.some(turn.throws, (t: Throw) => t.mark.id === mark.id);
    return hit;
};




export const mapTurn = (turn: Turn): Turn1 => {

    const targets: MarkTarget[] = [];

    if (turn.target.first) {
        targets.push(<MarkTarget>{ markId: turn.target.first.id, hit: isHit(turn.target.first, turn) });
    }
    if (turn.target.second) {
        targets.push(<MarkTarget>{ markId: turn.target.second.id, hit: isHit(turn.target.second, turn) });
    }
    if (turn.target.third) {
        targets.push(<MarkTarget>{ markId: turn.target.third.id, hit: isHit(turn.target.third, turn) });
    }

    const turn1: Turn1 = { targets, timestamp: turn.timestamp };
    return turn1;
};


export const reduceHits = (s: Stats, t: MarkTarget): Stats => {
    s.hits = s.hits || 0;
    if (t.hit) { s.hits++; }
    return s;
};


// export const getStats = (turns: Turn[]): Stats => {
//     let stats = new Stats();
//     const turn1s = turns.map(mapTurn);
//     stats = turn1s.reduce((s: Stats, t: Turn1) => t.targets.reduce(reduceHits, s), stats);
//     return stats;
// };


function updateHits(stats: Stats, target: MarkTarget): Stats {
    stats.hits = stats.hits || 0;
    stats.hits += target.hit ? 1 : 0;
    return stats;
}

function updateTurns(stats: Stats, turn: Turn1): Stats {
    stats.turns = stats.turns || 0;
    stats.turns++;
    return stats;
}

function updateThrows(stats: Stats, turn: Turn1): Stats {
    stats.throws = stats.throws || 0;
    stats.throws += 3;
    return stats;
}

export interface MarkCount {
    misses: number;
    hits: number;
}

export interface MarkCounts {[id: string]: MarkCount; }

function updateMarkCounts(stats: Stats, turn: Turn1): Stats {
    let counts = stats.markCounts || {};

    counts = turn.targets.reduce((c: MarkCounts, t: MarkTarget, i: number) => {
        c[t.markId] = c[t.markId] || { hits: 0, misses: 0 };
        c[t.markId].hits += t.hit ? 1 : 0;
        c[t.markId].misses += !(t.hit) && i === 0 ? 1 : 0;
        return c;
    }, counts);
    stats.markCounts = counts;
    return stats;
}  

function isMiss(turn: Turn1): boolean {
    const hit = _.some(turn.targets, (t: MarkTarget) => t.hit);
    return !hit;
}

function updateMisses(stats: Stats, turn: Turn1): Stats {
    stats.turnMisses = stats.turnMisses || 0;
    const miss = isMiss(turn);
    stats.turnMisses += miss ? 1 : 0;
    stats.turnHits += miss ? 0 : 1;
    return stats;
}

function updateMarks(stats: Stats, marks: Mark[], required: number): Stats {
    stats.marks = marks.length;
    stats.required = required;
    return stats;
}

function a(turns: Turn1[], marks: Mark[], required: number): Stats {
    const stats = new Stats();
    let c = turns.reduce((s: Stats, t: Turn1): Stats => {
        return t.targets.reduce(b, s);
    }, stats);


    c = turns.reduce((s: Stats, turn: Turn1): Stats => {
        s = updateThrows(stats, turn);
        s = updateTurns(stats, turn);
        s = updateMisses(stats, turn);
        s = updateMarks(stats, marks, required);
        s = updateMarkCounts(stats, turn);
        return s;
    }, stats);
    
    

    return c;
}

function b(stats: Stats, target: MarkTarget): Stats {
    stats = updateHits(stats, target);
    // stats = updateMisses(stats, turn);
    // stats = updateThrows(stats, turn);
    return stats;
}

function getRounds1(stats: Stats, marks: Mark[], turns: Turn[], count: number, markCounts: MarkCounts): Stats {


    if (markCounts == null) { 
        stats.rounds = 0;
        return stats;
    }



    let roundCount = _.max(_.values(markCounts).map(m => m.hits + m.misses));
    


    const scores = ScoreModule.getScores(turns, marks);
    const isComplete = ScoreModule.isComplete(marks, scores, count);

    if (!isComplete) {
        const target = ScoreModule.getTarget(marks, turns, count);
        if (!(target == null || target.first == null)) { 
            
    
            const targetCount = markCounts[target.first.id];
            if (!(targetCount == null)) {
                   
                const targetRound = targetCount.hits + targetCount.misses;
                
                if (targetRound >= roundCount) {
                    roundCount += 1;
                }
            }
        }
    }

    stats.rounds = roundCount;
    return stats;
}

function updateRounds(stats: Stats, turns: Turn[], marks: Mark[], required: number): Stats {
    stats = getRounds1(stats, marks, turns, required, stats.markCounts);
    return stats;
}

export const getStats = (turns: Turn[], marks: Mark[], required: number): Stats => {
    const turn1s = turns.map(mapTurn);
    let stats = a(turn1s, marks, required);
    stats = updateRounds(stats, turns, marks, required);
    return stats;
};

export const getDuration = (turns: Turn[], marks: Mark[], count: number): Duration => {
    const scores = ScoreModule.getScores(turns, marks);
    const isComplete = ScoreModule.isComplete(marks, scores, count);    
    const turns1 = turns.map(mapTurn);
    const timestamps = turns1.map(t => t.timestamp);
    if (isComplete === false) {
        timestamps.push(new Date());
    }

    const d = timestamps.reduce((duration: Duration, date: Date, i: number, turnList: Date[]): Duration => {
        let prev = i > 0 ? turnList[i - 1] : null;
        if (prev == null) {
            prev = moment(date).subtract(1, 'minute').toDate();
        }

        let diff = moment.duration(moment(date).diff(moment(prev)));
        if (diff.asMinutes() > 5) {
            diff = moment.duration(5, 'minute');
        }
        return duration.add(diff);

        // return duration;
    }, moment.duration(0, 'seconds'));

    return d;
};
