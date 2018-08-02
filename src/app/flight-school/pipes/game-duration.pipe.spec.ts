import { GameDurationPipe } from './game-duration.pipe';
import * as moment from 'moment';

describe('GameDurationPipe', () => {
    it('create an instance', () => {
        const pipe = new GameDurationPipe();
        expect(pipe).toBeTruthy();

        expect(pipe.transform(moment.duration(1, 'years'))).toBe('a year');
        expect(pipe.transform(moment.duration(2, 'years'))).toBe('2 years');

        expect(pipe.transform(moment.duration(4, 'days'))).toBe('4 days');
        expect(pipe.transform(moment.duration(1, 'days'))).toBe('a day');

        expect(pipe.transform(moment.duration(24, 'hours'))).toBe('a day');
        expect(pipe.transform(moment.duration(2, 'hours'))).toBe('2 hr');
        expect(pipe.transform(moment.duration(2.5, 'hours'))).toBe('2 hr 30 min');
        expect(pipe.transform(moment.duration(10, 'minutes'))).toBe('10 min');
        expect(pipe.transform(moment.duration(10.5, 'minutes'))).toBe('10 min');
        expect(pipe.transform(moment.duration(10, 'seconds'))).toBe('a few seconds');
        expect(pipe.transform(moment.duration(10, 'milliseconds'))).toBe('a few seconds');

    });
});
