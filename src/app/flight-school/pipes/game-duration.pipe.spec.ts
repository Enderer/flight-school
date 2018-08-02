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
        expect(pipe.transform(moment.duration(2, 'hours'))).toBe('2 hrs');
        expect(pipe.transform(moment.duration(2.5, 'hours'))).toBe('2 hrs 30 mins');
        expect(pipe.transform(moment.duration(10, 'minutes'))).toBe('10 mins');
        expect(pipe.transform(moment.duration(10.5, 'minutes'))).toBe('10 mins');
        expect(pipe.transform(moment.duration(10, 'seconds'))).toBe('1 min');
        expect(pipe.transform(moment.duration(10, 'milliseconds'))).toBe('1 min');

    });
});
