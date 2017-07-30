import { StoreModule, ActionReducerMap, compose } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { Mark, Turn, Selected } from '../models';
import * as fromSelected from './selected.reducer';
import * as fromTurns from './turns.reducer';
import * as fromCount from './count.reducer';
import * as fromMarks from './marks.reducer';
import * as fromMarksModal from './marks-modal.reducer';

export interface State {
    count: number;
    marks: Mark[];
    turns: Turn[];
    marksModal: fromMarksModal.State;
    selected: Selected;
}

export const reducers: ActionReducerMap<State> = {
    count: fromCount.reducer,
    marks: fromMarks.reducer,
    turns: fromTurns.reducer,
    marksModal: fromMarksModal.reducer,
    selected: fromSelected.reducer
};

const syncKeys = ['turns', 'marks', 'count', 'selected'];
const storageReducer = localStorageSync({ keys: syncKeys, rehydrate: true });
const syncReducer = compose(storeFreeze, storageReducer);

export function metaReducer(r) {
    return syncReducer(r);
}
export const metaReducers = [metaReducer];
export const ReducerModule = StoreModule.forRoot(reducers, { metaReducers });
