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

export const marksById = _.keyBy(marks, m => m.id);
export const bySector = _.groupBy(marks, m => m.s);
export const byRing = _.groupBy(marks, m => m.r);
export const lookup = _.mapValues(bySector, g => _.keyBy(g, m => m.r));

export const markSets = {
    'all': marks,
    'cricket_all': [
        marksById['S20R1'], marksById['S20R2'], marksById['S20R3'],
        marksById['S19R1'], marksById['S19R2'], marksById['S19R3'],
        marksById['S18R1'], marksById['S18R2'], marksById['S18R3'],
        marksById['S17R1'], marksById['S17R2'], marksById['S17R3'],
        marksById['S16R1'], marksById['S16R2'], marksById['S16R3'],
        marksById['S15R1'], marksById['S15R2'], marksById['S15R3'],
        marksById['S25R1'], marksById['S25R2']],
    'cricket': [
        marksById['S20R1'],
        marksById['S19R1'],
        marksById['S18R1'],
        marksById['S17R1'],
        marksById['S16R1'],
        marksById['S15R1'],
        marksById['S25R1']],
    'high': [],
    'low': [],
    'singles': [],
    'doubles': [],
    'trebles': []
};

/**
 * Returns a randomly selected subset of an array
 * @param {number} count - Length of the array to return
 * @param {any[]} list - Array to select elements from
 */
export const randomList = (count: number, list: any[]): any[] => {
    list = list || [];
    count = count == null ? list.length : count;

    const candidates = [...list];
    const selectedList = [];
    
    while (candidates.length > 0 && selectedList.length < count) {
        const i = Math.floor(Math.random() * candidates.length);
        const selected = candidates.splice(i, 1);
        selectedList.push(selected[0]);
    }
    return selectedList;
};
