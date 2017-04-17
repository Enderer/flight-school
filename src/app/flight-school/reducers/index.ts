import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { Mark } from '../models/mark';
import { Turn, getScores } from '../models/score';

import * as fromTurns from './turns.reducer';
import * as fromCount from './count.reducer';
import * as fromMarks from './marks.reducer';
import * as fromMarksModal from './marks-modal.reducer';

export interface State {
    count: number;
    marks: Mark[];
    turns: Turn[];
    marksModal: fromMarksModal.State;
}

const reducers = {
    count: fromCount.reducer,
    marksModal: fromMarksModal.reducer,
    marks: fromMarks.reducer,
    turns: fromTurns.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
// const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return developmentReducer(state, action);
}

export const getCount = (state: State) => state.count;

// Marks
export const getMarks = (state: State) => state.marks;

// Turns
export const getTurns = (state: State) => state.turns;

// Marks Modal
export const getShowMarkModalState = (state: State) => state.marksModal;
export const getMarksModalShow = createSelector(getShowMarkModalState, fromMarksModal.getShow);

// Scores
export const getScore = createSelector(getTurns, getMarks, getScores); 
