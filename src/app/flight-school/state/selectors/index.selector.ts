import * as _ from 'lodash';
import { State } from '../../reducers';
import { createSelector } from 'reselect';
import * as fromMarksModal from '../../reducers/marks-modal.reducer';
import { getScores, getTarget, Mark } from '../../models';

export const getCount = (state: State) => state.count;
export const getMarks = (state: State) => state.marks;
export const getTurns = (state: State) => state.turns;
export const getSelected = (state: State) => state.selected;
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

export const getIsComplete = createSelector(getMarks, getScore, getCount, (marks: Mark[], scores, count: number) => {
    const remaining = _.values(scores).filter(score => score.count < count);
    return !(remaining.length > 0);
});
