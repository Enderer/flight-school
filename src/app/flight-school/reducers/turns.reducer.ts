import { Turn } from '../models/score';
import * as turns from '../actions/turns.actions';

export const initialState: Turn[] = [];

export function reducer(state = initialState, action: turns.Actions): Turn[] {

    switch (action.type) {

        case turns.TURNS_UPDATE_COMPLETE: { 
            return action.payload;
        }

        default: { return state; }
    }
}
