import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { Mark } from '../../models/mark';
import { lookup, bySector, byRing, marks, sectors, rings } from '../../models/marks';

@Component({
    selector: 'fs-modal-marks',
    templateUrl: './modal-marks.component.html',
    styleUrls: ['./modal-marks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalMarksComponent implements OnInit {
    @Input() marks: Mark[];
    
    selected: {[id: string]: number} = {};
    lookup = lookup;

    @Output() confirm = new EventEmitter();
    @Output() cancel = new EventEmitter();

    constructor() {}

    ngOnInit() {
        console.debug('ModalMarks::ngOnInit');
        this.marks = this.marks || [];
        this.selected = this.marks.reduce((map, obj, i) => {
            map[obj.id] = i + 1;
            return map;
        }, {});
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
            const num = _.values(this.selected).length;
            this.selected[id] = num + 1;
        }
        event.stopImmediatePropagation();
        event.preventDefault();
    }

    /**
     * User has clicked the save button. Return the list of selected marks
     */
    onConfirm(event: MouseEvent): void {
        console.debug('MarksModal::onConfirm');
        // Get the marks that have been selected by the user and return them
        // Make sure they are sorted in the order that they were clicked
        // The first mark clicked will be the first in the list when the 
        // dialog closed.
        const indexed = _.map(marks, m => {
            return { i: this.selected[m.id], m };
        });
        const filtered =  _.filter(indexed, s => !!s.i);
        const ordered = _.orderBy(filtered, 'i');
        const selected = _.map(ordered, m => m.m);
        this.confirm.emit(selected);
    }

    onCancel(event: Event): void {
        console.debug('MarksModalComponent::onCancel');
        this.cancel.emit();
    }

    get count(): number {
        const selected = marks.filter(m => this.selected[m.id]);
        return selected.length || 0;
    }
}
