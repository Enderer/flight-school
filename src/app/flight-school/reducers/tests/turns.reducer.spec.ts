import { initialState, reducer } from '../turns.reducer';
import * as Actions from '../../actions/turns.actions';
import { Turn, Mark, Target, marksById } from '../../models';

describe('Turns reducer', () => {

    it('should initialize to an empty', () => {
        expect(initialState).toEqual([]);
    });

    it('should update to an empty', () => {
        const actions = new Actions.TurnsUpdateComplete([]);
        expect(reducer(undefined, actions)).toEqual([]);
    });

    it('should handle null', () => {
        const actions = new Actions.TurnsUpdateComplete(null);
        expect(reducer(undefined, actions)).toEqual(null);
    });

    it('should update turns', () => {
        const turns = [
            new Turn(
                [], 
                marksById['S20R1'], 
                new Target(
                    marksById['S20R1'], 
                    marksById['S19R1'], 
                    marksById['S18R1']
                )
            )
        ];
        const actions = new Actions.TurnsUpdateComplete(turns);
        expect(reducer([], actions)).toEqual(turns);
    });

    it('should return original state', () => {
        expect(reducer([], <Actions.TurnsUpdateComplete>{})).toEqual([]);
    });
});
