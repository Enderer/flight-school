import { createSelector } from 'reselect';
import * as _ from 'lodash';
import { Turn, Score, Throw, Selected } from '../models/score';
import * as selected from '../actions/selected.actions';

export const initialState: Selected = {
    first: false,
    second: false,
    third: false
};

export function reducer(state = initialState, action: selected.Actions): Selected {

    switch (action.type) {
        case selected.SELECTED_UPDATE_COMPLETE: { return action.payload; }
        default: { return state; }
    }
}
