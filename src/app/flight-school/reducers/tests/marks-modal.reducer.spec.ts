import { State, initialState, reducer, getShow } from '../marks-modal.reducer';
import * as Actions from '../../actions/marks-modal.actions';

describe('Marks Modal reducer', () => {

    it('should initialize to not shown', () => {
        expect(initialState.show).toBe(false);
    });

    it('should show the modal', () => {
        expect(reducer(undefined, new Actions.Show()).show).toBe(true);
        expect(reducer({ show: false }, new Actions.Show()).show).toBe(true);
        expect(reducer({ show: true }, new Actions.Show()).show).toBe(true);
    });   

    it('should hide the modal', () => {
        expect(reducer(undefined, new Actions.Hide()).show).toBe(false);
        expect(reducer({ show: true }, new Actions.Hide()).show).toBe(false);
        expect(reducer({ show: false }, new Actions.Hide()).show).toBe(false);
    }); 

    it('should return original state', () => {
        expect(reducer(undefined, <Actions.Actions>{}).show).toBe(false);
    });

    it('getShow should return show', () => {
        expect(getShow({show: true})).toBe(true);
        expect(getShow({show: false})).toBe(false);
        expect(getShow(undefined)).toBe(undefined);
    });  
});
