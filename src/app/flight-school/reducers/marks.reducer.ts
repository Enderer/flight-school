import { Mark } from '../models/mark';
import * as marks from '../actions/marks.actions';

export const initialState: Mark[] = [];

export function reducer(state = initialState, action: marks.Actions): Mark[] {
    switch (action.type) {
        case marks.MARKS_UPDATE_COMPLETE: { 
            return action.payload;
        }

        default: { return state; }
    }
}
