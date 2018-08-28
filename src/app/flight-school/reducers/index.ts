import * as _ from 'lodash';
import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { compose } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers, MetaReducer } from '@ngrx/store';
import { ActionReducerMap } from '@ngrx/store';
import { environment } from '../../../environments/environment';

import { Mark } from '../models/mark';
import { Score, Turn, Selected, getScores, getTarget, isComplete, getStart, getEnd } from '../models/score';
import { getRoundCount, getStats, getDuration } from '../models/stats';

import * as fromSelected from './selected.reducer';
import * as fromTurns from './turns.reducer';
import * as fromCount from './count.reducer';
import * as fromMarks from './marks.reducer';
import * as fromMarksModal from './marks-modal.reducer';

import { localStorageSync } from 'ngrx-store-localstorage';



export interface State {
    count: number;
    marks: Mark[];
    turns: Turn[];
    marksModal: fromMarksModal.State;
    selected: Selected;
}

export const reducers: ActionReducerMap<State> = {
    count: fromCount.reducer,
    marksModal: fromMarksModal.reducer,
    marks: fromMarks.reducer,
    turns: fromTurns.reducer,
    selected: fromSelected.reducer,
};

// const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
// const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    const keys = ['turns', 'marks', 'count', 'selected', 'start'];
    return localStorageSync({keys, rehydrate: true})(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const getCount = (state: State) => state.count;
export const getMarks = (state: State) => state.marks;
export const getTurns = (state: State) => state.turns;
export const getSelected = (state: State) => state.selected;

// Marks Modal
export const getShowMarkModalState = (state: State) => state.marksModal;
export const getMarksModalShow = createSelector(getShowMarkModalState, fromMarksModal.getShow);

// Scores
export const getScore = createSelector(getTurns, getMarks, getScores);

export const getActiveMarks = createSelector(getScore, getCount, (scores, count): Mark[] => {
    console.debug('getActiveMarks');

    const s = _.values(scores);
    const a = _.filter(s, score => {
        return !(score.count >= count);
    });
    const m = _.map(a, score => score.mark);
    return m;
});

// Target
export const getNextTarget = createSelector(getMarks, getTurns, getCount, getTarget);
export const getIsComplete = createSelector(getMarks, getScore, getCount, isComplete);
export const getRounds = createSelector(getScore, getRoundCount);
export const selectStats = createSelector(getTurns, getMarks, getCount, getStats);
export const selectStart = createSelector(getTurns, getStart);
export const selectEnd = createSelector(getMarks, getTurns, getCount, getEnd);
export const selectDuration = createSelector(getTurns, getMarks, getCount, getDuration);

