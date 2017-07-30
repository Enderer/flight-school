import { initialState, reducer } from '../count.reducer';
import { CountUpdateComplete } from '../../actions/count.actions';

describe('Count reducer', () => {
    it('should initialize to 5', () => {
        expect(initialState).toBe(5);
    });

    it('should update the count', () => {
        expect(reducer(5, new CountUpdateComplete(6))).toBe(6);
        expect(reducer(5, new CountUpdateComplete(4))).toBe(4);
        expect(reducer(null, new CountUpdateComplete(4))).toBe(4);
        expect(reducer(5, new CountUpdateComplete(null))).toBe(null);
    });

    it('should return the original state ', () => {
        expect(reducer(undefined, <CountUpdateComplete>{})).toBe(5);
        expect(reducer(null, <CountUpdateComplete>{})).toBe(null);
        expect(reducer(4, <CountUpdateComplete>{})).toBe(4);
    });
});
