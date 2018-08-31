import * as CountActions from '../actions/count.actions';

export const initialState = 5;

export function reducer(state = initialState, action: CountActions.Actions): number {
  switch (action.type) {
    case CountActions.COUNT_UPDATE_COMPLETE: {
      const count = action.payload;
      return count;
    }

    default: {
      return state;
    }
  }
}
