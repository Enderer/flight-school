import * as count from '../actions/count.actions';

export const initialState = 5;

export function reducer(state = initialState, action: count.Actions): number {
  switch (action.type) {
    case count.COUNT_UPDATE_COMPLETE: {
      const count = action.payload;
      return count;
    }

    default: {
      return state;
    }
  }
}
