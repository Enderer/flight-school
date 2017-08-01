/**
 * Mark - Represents a single section of the dartboard
 * e.g. single 20, treble 18, bull, etc...
 */
export class Mark {
    /**
     * Constructor
     * @param {string} id - Uniquely identifies the mark
     * @param {number} s - Sector number
     * @param {number} r - Ring number
     */
    constructor(
        public id: string,
        public s: number,
        public r: number
    ) {}
}
