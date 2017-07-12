import * as _ from 'lodash';
import { Mark } from '../models/mark';

export const sectors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
export const rings = [1, 2, 3];
export const marks: Mark[] = [];

sectors.forEach(s => rings.forEach(r => {
    marks.push({ 
        id: `S${s}R${r}`,
        s: s,
        r: r
    });
}));

marks.push({ id: `S${25}R${1}`, s: 25, r: 1 });
marks.push({ id: `S${25}R${2}`, s: 25, r: 2 });

export const byId = _.keyBy(marks, m => m.id);
export const bySector = _.groupBy(marks, m => m.s);
export const byRing = _.groupBy(marks, m => m.r);
export const lookup = _.mapValues(bySector, g => _.keyBy(g, m => m.r));
