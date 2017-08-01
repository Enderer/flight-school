import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Selected, none, one, two, three } from '../models/selected';

describe('Selected', () => {
    it('should set values', () => {
        expect(new Selected(true).first).toBe(true);
        expect(new Selected(true).second).toBe(false);
        expect(new Selected(true).third).toBe(false);
    });
    it('should have correct values', () => {
        expect(none.first).toBe(false);
        expect(none.second).toBe(false);
        expect(none.third).toBe(false);

        expect(one.first).toBe(true);
        expect(one.second).toBe(false);
        expect(one.third).toBe(false);

        expect(two.first).toBe(true);
        expect(two.second).toBe(true);
        expect(two.third).toBe(false);

        expect(three.first).toBe(true);
        expect(three.second).toBe(true);
        expect(three.third).toBe(true);
    });
});
