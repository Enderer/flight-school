import { Mark, marks } from '../../models';
import { initialState, reducer } from '../marks.reducer';
import * as Actions from '../../actions/marks.actions';

describe('Marks reducer', () => {

    it('should initialize to an empty array', () => {
        expect(initialState).toEqual([]);
    });

    it('should update marks', () => {
        const action = new Actions.MarksUpdateComplete(marks);
        expect(reducer(undefined, action)).toEqual(marks);
    });

    it('should clear marks', () => {
        const action = new Actions.MarksUpdateComplete([]);
        expect(reducer(undefined, action)).toEqual([]);
    });

    it('should handle null', () => {
        const action = new Actions.MarksUpdateComplete(null);
        expect(reducer(undefined, action)).toEqual(null);
    });
    
    it('should return empty state', () => {
        const m = [];
        expect(reducer(m, <Actions.Actions>{})).toBe(m);
    });
});
