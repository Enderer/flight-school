import { Mark, marksById } from '../models';
import { MarkPipe } from './mark.pipe';

describe('MarkPipe', () => {
    it('should create an instance', () => {
        const pipe = new MarkPipe();
        expect(pipe).toBeTruthy();
    });

    it('should handle null values', () => {
        const pipe = new MarkPipe();
        expect(() => pipe.transform(undefined)).not.toThrow();
        expect(() => pipe.transform(null)).not.toThrow();
    });

    it('should handle nonexistent marks', () => {
        const pipe = new MarkPipe();
        expect(pipe.transform(<Mark>{ s: 100, r: 50 })).toBe('(50)100');
        expect(pipe.transform(<Mark>{ s: 100 })).toBe('(null)100');
        expect(pipe.transform(<Mark>{ r: 50 })).toBe('(50)null');
        expect(pipe.transform(<Mark>{})).toBe('(null)null');
    });

    it('should display labels for all marks', () => {
        const pipe = new MarkPipe();
        expect(pipe.transform(marksById['S25R1'])).toBe('Bull');
        expect(pipe.transform(marksById['S25R2'])).toBe('DB');
        expect(pipe.transform(marksById['S20R1'])).toBe('S20');
        expect(pipe.transform(marksById['S20R2'])).toBe('D20');
        expect(pipe.transform(marksById['S20R3'])).toBe('T20');
        expect(pipe.transform(marksById['S19R1'])).toBe('S19');
        expect(pipe.transform(marksById['S19R2'])).toBe('D19');
        expect(pipe.transform(marksById['S19R3'])).toBe('T19');
        expect(pipe.transform(marksById['S18R1'])).toBe('S18');
        expect(pipe.transform(marksById['S18R2'])).toBe('D18');
        expect(pipe.transform(marksById['S18R3'])).toBe('T18');
        expect(pipe.transform(marksById['S17R1'])).toBe('S17');
        expect(pipe.transform(marksById['S17R2'])).toBe('D17');
        expect(pipe.transform(marksById['S17R3'])).toBe('T17');
        expect(pipe.transform(marksById['S16R1'])).toBe('S16');
        expect(pipe.transform(marksById['S16R2'])).toBe('D16');
        expect(pipe.transform(marksById['S16R3'])).toBe('T16');
        expect(pipe.transform(marksById['S15R1'])).toBe('S15');
        expect(pipe.transform(marksById['S15R2'])).toBe('D15');
        expect(pipe.transform(marksById['S15R3'])).toBe('T15');
    });        
});
