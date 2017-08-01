export class Selected {
    constructor(
        public first = false,
        public second = false,
        public third = false) {} 
}

export const none = new Selected();
export const one = new Selected(true);
export const two = new Selected(true, true);
export const three = new Selected(true, true, true);
