import { createSelector } from 'reselect';
import * as marksModal from '../actions/marks-modal.actions';

export interface State {
    show: boolean;
}

export const initialState = {
    show: false
};

export function reducer(state = initialState, action: marksModal.Actions): State {
    switch (action.type) {
        case marksModal.SHOW: { 
            if (state.show) { return state; }
            return { ...state, show: true };
        }

        case marksModal.HIDE: { 
            if (state.show === false) { return state; }
            return { ...state, show: false };
        }

        default: {
            return state;
        }
    }
}

export const getShow = (state: State) => state.show;
