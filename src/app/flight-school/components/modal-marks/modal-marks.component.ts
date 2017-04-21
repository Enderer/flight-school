import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import * as _ from 'lodash';
import { Mark } from '../../models/mark';
import { lookup, bySector, byRing, marks, sectors, rings } from '../../models/marks';

export interface MarksModel {
    title: string;
    message: string;
    marks: Mark[];
}

@Component({
    selector: 'fs-modal-marks',
    templateUrl: './modal-marks.component.html',
    styleUrls: ['./modal-marks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalMarksComponent extends DialogComponent<MarksModel, Mark[]> implements MarksModel, OnInit {
    title: string;
    message: string;
    marks: Mark[];
    selected: {[id: string]: boolean} = {};

    sectors = _.sortBy(sectors).reverse();
    rings = rings;
    lookup = lookup;

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    ngOnInit() {
        const marks = this.marks || [];
        marks.forEach(m => this.selected[m.id] = true);
    }

    isSelected(s: number, r: number): boolean {
        const mark = this.lookup[s][r];
        const id = mark.id;
        const selected = !!this.selected[id];
        return selected;
    }
    
    refreshClicked() {
        this.selected = {};
    }

    markClicked(sector: number, ring: number) {
        const mark = this.lookup[sector][ring];
        const id = mark.id;
        const selected = !this.selected[id];
        this.selected[id] = selected;
        console.debug('ModalMarks::markClicked selected', sector, ring, selected);
    }

    confirm() {
        const selected = marks.filter(m => this.selected[m.id]);
        this.result = selected;
        this.close();
    }

    get selectedMarks(): Mark[] {
        return marks.filter(m => this.selected[m.id]);
    }

    get count(): number {
        return this.selectedMarks.length;
    }
}
