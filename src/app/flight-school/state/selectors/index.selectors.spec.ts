import { State } from '../../reducers';
import * as a from '../../models';
import {
    getCount,
    getMarks,
    getTurns,
    getSelected,
    getShowMarkModalState,
    getMarksModalShow,
    getScore,
    getActiveMarks,
    getNextTarget,
    getIsComplete
} from './index.selector';

describe('Index selectors', () => {
    it('getActiveMarks should work', () => {
        expect(getCount(<State>{ count: 100 })).toBe(100);

        expect(getActiveMarks(<State>{
            count: 5,
            marks: [],
            turns: [],
        })).toEqual([]);
    });
});
