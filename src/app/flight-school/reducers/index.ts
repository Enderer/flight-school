import * as _ from 'lodash';
import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { Mark } from '../models/mark';
import { Score, Turn, Selected, getScores, getTarget } from '../models/score';

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

const reducers = {
    count: fromCount.reducer,
    marksModal: fromMarksModal.reducer,
    marks: fromMarks.reducer,
    turns: fromTurns.reducer,
    selected: fromSelected.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
// const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return developmentReducer(state, action);
}

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
export const getNextTarget = createSelector(getActiveMarks, getTurns, getTarget);
