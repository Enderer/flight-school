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
    selected: {[id: string]: number} = {};
    num = 1;
    sectors = _.sortBy(sectors).reverse();
    rings = rings;
    lookup = lookup;

    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    ngOnInit() {
        console.debug('ModalMarks::ngOnInit');
        const marks = this.marks || [];
        marks.forEach((m, i) => {
            this.selected[m.id] = this.num++;
        });
    }

    isSelected(s: number, r: number): boolean {
        const mark = this.lookup[s][r];
        const id = mark.id;
        const selected = !!this.selected[id];
        return selected;
    }
    
    refreshClicked(event: Event) {
        console.debug('ModalMarks::refeshClicked');
        this.selected = {};        
        event.stopImmediatePropagation();
        event.preventDefault();
    }

    markClicked(sector: number, ring: number, $event) {
        console.debug('ModalMarksComponent::markClicked', sector, ring, $event);
        const mark = this.lookup[sector][ring];
        const id = mark.id;
        if (this.selected[id]) { 
            this.selected[id] = null;
        } else {
            this.selected[id] = this.num++;
        }
        event.stopImmediatePropagation();
        event.preventDefault();
    }

    /**
     * User has clicked the save button. Return the list of selected marks
     */
    confirm($event: Event) {
        console.debug('ModalMarks::confirm');

        // Get the marks that have been selected by the user and return them
        // Make sure they are sorted in the order that they were clicked
        // The first mark clicked will be the first in the list when the 
        // dialog closed.
        const indexed = _.map(marks, m => {
            return { i: this.selected[m.id], m };
        });
        const filtered =  _.filter(indexed, s => s.i);
        const ordered = _.orderBy(filtered, 'i');
        const selected = _.map(ordered, m => m.m);

        // Set the marks and close the form
        this.result = selected;
        this.close();
        $event.stopImmediatePropagation();
        $event.preventDefault();
    }


    closeClicked(event: Event): void {
        console.debug('MarksModalComponent::closeClicked');
        this.close();
        event.stopImmediatePropagation();
        event.preventDefault();
    }

    get count(): number {
        const selected = marks.filter(m => this.selected[m.id]);
        return selected.length || 0;
    }
}
