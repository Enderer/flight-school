import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Throw, marksById } from '../models';

describe('Throw', () => {
    it('should initialize to null', () => {
        expect(new Throw().mark).toBe(null);
        expect(new Throw().mark).toBe(null);
    });
    it('should set both marks and target', () => {
        const mark = marksById['S20R1'];
        expect(new Throw(mark, mark).mark).toBe(mark);
        expect(new Throw(mark, mark).target).toBe(mark);
    });
    it('should set one of marks and target', () => {
        const mark = marksById['S20R1'];
        expect(new Throw(mark, null).mark).toBe(mark);
        expect(new Throw(null, mark).mark).toBe(null);
    });
});
