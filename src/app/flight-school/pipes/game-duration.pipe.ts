import { Pipe, PipeTransform } from '@angular/core';
import { Duration } from 'moment';
import * as moment from 'moment';

/**
 * Formats the duration of the game for display to the user
 * Uses conditional logic to show a human readable duration
 */
@Pipe({ name: 'gameDuration' })
export class GameDurationPipe implements PipeTransform {

    transform(duration: Duration, args?: any): string {
        if (duration == null) { return ''; }

        const years = duration.years();
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        const milliseconds = duration.milliseconds();

        // The duration is greater than a day
        if (years > 0 || days > 0) { 
            return duration.humanize();
        }

        // The duration is greater than an minute
        if (hours > 0 || minutes > 0) {
            const labels = [];
            if (hours > 0) { labels.push(`${hours} ${hours === 1 ? 'hr' : 'hrs' }`); }
            if (minutes > 0) { labels.push(`${minutes} ${minutes === 1 ? 'min' : 'mins' }`); }
            return labels.join(' ');
        }

        // The duration is less than a minute
        if (seconds > 0 || milliseconds > 0) { 
            return '1 min';
        }
        
        return '';
    }
}
