import { Throw, Mark, Target } from '../models';

export class Turn {
    /**
     * Constructor
     * @param {Throw[]} throws - List of marks hit this turn
     * @param {Mark} start  - First mark to be hit at the start of the turn
     * @param {Target} target - Marks thrown at this turn
     */
    constructor(
        public throws: Throw[] = [],
        public start: Mark = null,
        public target: Target = null
    ) {}
}
