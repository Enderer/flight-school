import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Score, Turn, Throw, Target, getScores, getTarget, marksById, markSets  } from '../models';

describe('Score', () => {
    describe('getTarget', () => {

        it('should get the next targets', () => {
            const marks = [
                marksById['S20R1'],
                marksById['S20R2'],
                marksById['S20R3'],
                marksById['S19R1'],
                marksById['S19R2'],
                marksById['S19R3'],
            ];
            const turns = [
                new Turn([
                    new Throw(marks[0], marks[0]),
                ],
                marksById['S20R1'],
                new Target(
                    marks[0],
                    marks[1],
                    marks[2]
                ))
            ];
            const target = getTarget(marks, turns, 5);
            expect(target.first).toBe(marks[1]);
            expect(target.second).toBe(marks[2]);
            expect(target.third).toBe(marks[3]);
        });

        it('should restart at top of list', () => {
            const marks = [
                marksById['S20R1'],
                marksById['S20R2'],
                marksById['S20R3'],
                marksById['S19R1']
            ];
            const turns = [
                new Turn(
                    [
                        new Throw(marks[0], marks[0]),
                        new Throw(marks[1], marks[1]),
                        new Throw(marks[2], marks[2]),
                    ],
                    marks[0],
                    new Target(
                        marks[0],
                        marks[1],
                        marks[2]
                    )
                ),
                new Turn(
                    [
                        new Throw(marks[3], marks[3]),
                        new Throw(marks[0], marks[0])
                    ],
                    marks[3],
                    new Target(
                        marks[3],
                        marks[0],
                        marks[1]
                    )
                )
            ];
            const target = getTarget(marks, turns, 5);
            expect(target.first).toBe(marks[1]);
            expect(target.second).toBe(marks[2]);
            expect(target.third).toBe(marks[3]);
        });

        it('should handle no marks', () => {
            const target = getTarget([], [], 5);
            expect(target.first).toBe(null);
            expect(target.second).toBe(null);
            expect(target.third).toBe(null);
        });
        
        it('should handle null', () => {
            const target = getTarget(null, null, 5);
            expect(target.first).toBe(null);
            expect(target.second).toBe(null);
            expect(target.third).toBe(null);
        });
    });
});
