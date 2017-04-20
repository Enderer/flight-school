export class Stats {
    turns = 0;
    throws = 0;
    hits = 0;
    misses = 0;
    rounds = 0;
    
    startTime: Date;
    endTime: Date;

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
