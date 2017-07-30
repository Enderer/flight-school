import { Pipe, PipeTransform } from '@angular/core';
import { Mark } from '../models';

/**
 * Mark Pipe - Formats a mark with a descriptive label
 * Format is [Ring][Sector] - e.g. S20, T10, D3, B, DB
 */
@Pipe({ name: 'mark' })
export class MarkPipe implements PipeTransform {

    static ring = { 1: 'S', 2: 'D', 3: 'T' };

    transform(mark: Mark): any {
        if (mark == null) { return ''; }
        const { r = null, s = null } = mark;
        if (mark.r === 1 && mark.s === 25) { return 'Bull'; }
        if (mark.r === 2 && mark.s === 25) { return 'DB'; }
        const ring = MarkPipe.ring[r] || `(${r})`;
        return `${ring}${s}`;
    }
}
