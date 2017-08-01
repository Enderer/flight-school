import { createSelector } from 'reselect';
import * as Action from '../actions/count.actions';

export const initialState = 5;

export function reducer(state = initialState, action: Action.Actions): number {
  switch (action.type) {
    case Action.COUNT_UPDATE_COMPLETE: {
      const count = action.payload;
      return count;
    }

    default: {
      return state;
    }
  }
}
