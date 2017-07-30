import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import * as _ from 'lodash';
import { Mark } from '../../models/mark';
import { lookup, bySector, byRing, marks, sectors, rings, randomList, markSets } from '../../models/marks';

export interface MarksModel {
    marks: Mark[];
}

/**
 * Displays a dialog that allows the user to 
 * select what marks they want to shoot at
 */
@Component({
    selector: 'fs-modal-marks',
    templateUrl: './modal-marks.component.html',
    styleUrls: ['./modal-marks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalMarksComponent extends DialogComponent<MarksModel, Mark[]> implements MarksModel, OnInit {
    marks: Mark[];
    private selected: {[id: string]: number} = {};
    private num = 1;
    private sectors = _.sortBy(sectors).reverse();
    private rings = rings;
    private lookup = lookup;

    constructor(
        dialogService: DialogService,
        private change: ChangeDetectorRef) {
        super(dialogService);
    }

    ngOnInit() {
        console.debug('ModalMarks::ngOnInit');
        this.setSelectedMark(this.marks);
    }

    /** Returns the number of marks that have been selected */
    get count(): number {
        const selected = marks.filter(m => {
            const isSelected = this.selected[m.id] != null;
            return isSelected;
        });
        return selected.length || 0;
    }

    /** 
     * Returns true if the given mark is currently selected
     * @param {number} s - Sector number
     * @param {number} r - Ring number
     */
    isSelected(s: number, r: number): boolean {
        const mark = this.lookup[s][r];
        const id = mark.id;
        const selected = this.selected[id] != null;
        return selected;
    }
    
    /** Reset button was clicked. Clear all selected marks */
    refreshClicked(event: MouseEvent) {
        console.debug('ModalMarks::refeshClicked');
        this.selected = {};        
        event.stopImmediatePropagation();
        event.preventDefault();
    }

    /** 
     * User clicked a mark. Add the mark to the selected list
     * If it's already selected remove the selection.
     */
    markClicked(sector: number, ring: number, $event) {
        console.debug('ModalMarks::markClicked', sector, ring, $event);
        const mark = this.lookup[sector][ring];
        const id = mark.id;
        if (this.selected[id] != null) { 
            this.selected[id] = null;
        } else {
            this.selected[id] = this.num++;
        }
        event.stopImmediatePropagation();
        event.preventDefault();
    }

    /**
     * User clicked the save button. Return the list of selected marks
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
        const filtered =  _.filter(indexed, s => s.i != null);
        const ordered = _.orderBy(filtered, 'i');
        const selected = _.map(ordered, m => m.m);

        // Set the marks and close the form
        this.result = selected;
        this.close();
        $event.stopImmediatePropagation();
        $event.preventDefault();
    }

    /**
     * User clicked the close button. Close the 
     * form without changing the marks selected
     */
    closeClicked(event: Event): void {
        console.debug('MarksModalComponent::closeClicked');
        this.close();
        event.stopImmediatePropagation();
        event.preventDefault();
    }

    /** 
     * User clicked the random button. Select a random list of marks
     */
    randomClicked(): void {
        console.debug('MarksModalComponent::randomClicked');
        // let i = 0;
        // const interval = setInterval(() => {
            const randomMarks = randomList(10, markSets.all);
            this.setSelectedMark(randomMarks);
            // this.randomClicked();
        //     this.change.detectChanges();
        //     if (++i >= 5) { clearInterval(interval); }
        // }, 150);
    }

    /** Set the list of selected marks to the ones provided */
    private setSelectedMark(marks: Mark[]): void {
        const a = _.map(marks, (v, i) => ({ v, i}));
        const b = _.keyBy(a, m => m.v.id);
        const c = _.mapValues(b, m => m.i);
        this.selected = c;
    }
}
