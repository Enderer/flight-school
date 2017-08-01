import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Turn, Throw, Target, marksById } from '../models';

describe('Turn', () => {
    it('should initialize', () => {
        const turn = new Turn();
        expect(turn.start).toEqual(null);
        expect(turn.target).toBe(null);
        expect(turn.throws).toEqual([]);
    });

    it('should initialize', () => {
        const target = new Target(
            marksById['S20R1'], 
            marksById['S20R2'], 
            marksById['S20R3']
        );
        const throws = [
            new Throw(marksById['S20R1'], marksById['S20R1']),
            new Throw(marksById['S20R2'], marksById['S20R2']),
            new Throw(marksById['S20R3'], marksById['S20R3']),
        ];
        const turn = new Turn(
            throws,
            target.first,
            target
        );
        expect(turn.start).toBe(target.first);
        expect(turn.target).toBe(target);
        expect(turn.throws).toEqual(throws);
    });
});
