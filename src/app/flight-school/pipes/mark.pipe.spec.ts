import { byId } from '../models';
import { MarkPipe } from './mark.pipe';

describe('MarkPipe', () => {
    it('creates an instance', () => {
        const pipe = new MarkPipe();
        expect(pipe).toBeTruthy();
    });

    it('handles null values', () => {
        const pipe = new MarkPipe();
        expect(() => pipe.transform(undefined)).not.toThrow();
        expect(() => pipe.transform(null)).not.toThrow();
        expect(pipe).toBeTruthy();
    });

    it('displays labels for all marks', () => {
        const pipe = new MarkPipe();
        expect(pipe.transform(byId['S20R1'])).toBe('S20');
        expect(pipe.transform(byId['S20R2'])).toBe('D20');
        expect(pipe.transform(byId['S20R3'])).toBe('T20');
        expect(pipe.transform(byId['S19R1'])).toBe('S19');
        expect(pipe.transform(byId['S19R2'])).toBe('D19');
        expect(pipe.transform(byId['S19R3'])).toBe('T19');
        expect(pipe.transform(byId['S18R1'])).toBe('S18');
        expect(pipe.transform(byId['S18R2'])).toBe('D18');
        expect(pipe.transform(byId['S18R3'])).toBe('T18');
        expect(pipe.transform(byId['S17R1'])).toBe('S17');
        expect(pipe.transform(byId['S17R2'])).toBe('D17');
        expect(pipe.transform(byId['S17R3'])).toBe('T17');
        expect(pipe.transform(byId['S16R1'])).toBe('S16');
        expect(pipe.transform(byId['S16R2'])).toBe('D16');
        expect(pipe.transform(byId['S16R3'])).toBe('T16');
        expect(pipe.transform(byId['S15R1'])).toBe('S15');
        expect(pipe.transform(byId['S15R2'])).toBe('D15');
        expect(pipe.transform(byId['S15R3'])).toBe('T15');
    });


            
});
