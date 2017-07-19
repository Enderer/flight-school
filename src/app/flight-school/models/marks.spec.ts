import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from 'ng2-bootstrap-modal';
import { randomList, markSets, marksById } from './marks';
import * as seedrandom from 'seedrandom';
import * as _ from 'lodash';
import { Mark } from './mark';

describe('Marks', () => {

    describe('markSets', () => {
        it('should have the correct marks', () => {
            expect(markSets.cricket).toEqual([
                marksById['S20R1'], 
                marksById['S19R1'], 
                marksById['S18R1'], 
                marksById['S17R1'], 
                marksById['S16R1'], 
                marksById['S15R1'], 
                marksById['S25R1']
            ]);
        });
    });

    describe('randomList', () => {

        beforeEach(() => {
            seedrandom('flightschool', { global: true });
        });

        it('should return [] when list is null', () => {
            expect(randomList(2, null)).toEqual([]);
        });

        it('should return [] when count is null', () => {
            expect(randomList(null, [])).toEqual([]);
            expect(randomList(undefined, [])).toEqual([]);
        });

        it('should default count to list length', () => {
            expect(randomList(null, [1, 2, 3]).length).toEqual(3);
            expect(randomList(undefined, [1, 2, 3]).length).toEqual(3);
            expect(randomList(20, [1, 2, 3]).length).toEqual(3);
        });

        it('should return 5 element list', () => {
            const cricketMarks = randomList(5, [1, 2, 3, 4, 5, 6, 7]);
            expect(cricketMarks.length).toBe(5);
        });

        it('should return [6, 7, 5]', () => {
            const cricketMarks = randomList(3, [1, 2, 3, 4, 5, 6, 7]);
            expect(cricketMarks).toEqual([6, 7, 5]);
        });

        it('should return [S15, Bull, S16]', () => {
            const cricketMarks = randomList(3, markSets.cricket);
            expect(cricketMarks).toEqual([
                marksById['S15R1'], 
                marksById['S25R1'],
                marksById['S16R1']
            ]);
        });

        it('should not contain nulls or duplicates', () => {
            for (let i = 0; i < 100; i++) {
                const subset = randomList(5, markSets.cricket);
                expect(subset.some(m => m == null)).toBe(false);
                const max = _(subset).countBy('id').values().max();
                expect(max).toBe(1);
            }
        });
    });
});
