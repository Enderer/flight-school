import { initialState, reducer } from '../selected.reducer';
import * as Actions from '../../actions/selected.actions';

describe('Selected reducer', () => {

    it('should initialize to an empty', () => {
        expect(initialState).toEqual({
            first: false,
            second: false,
            third: false
        });
    });

    it('should update selected', () => {
        const selected = { first: true, second: false, third: false };
        const action = new Actions.SelectedUpdateComplete(selected);
        expect(reducer(undefined, action)).toEqual(selected);
    });

    it('should clear selected', () => {
        const selected = { first: false, second: false, third: false };
        const action = new Actions.SelectedUpdateComplete(selected);
        expect(reducer(undefined, action)).toEqual(selected);
    });

    it('should return original state', () => {
        const selected = { first: false, second: false, third: false };
        expect(reducer(selected, <Actions.SelectedUpdateComplete>{})).toEqual(selected);
    });
});
