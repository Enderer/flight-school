import { Mark } from '../models';

export class Target {
    constructor(
        public first: Mark = null,
        public second: Mark = null,
        public third: Mark = null
    ) {}
}

export const emptyTarget: Target = new Target();
