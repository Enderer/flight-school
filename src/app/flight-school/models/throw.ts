import { Mark } from '../models';

/** 
 * A single throw by a player 
 */
export class Throw {
    constructor(
        public mark: Mark = null, 
        public target: Mark = null) {}
}
