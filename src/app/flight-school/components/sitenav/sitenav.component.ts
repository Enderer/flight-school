import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fs-sitenav',
    templateUrl: './sitenav.component.html',
    styleUrls: ['./sitenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SitenavComponent implements OnInit {

    @Input() count = 5;
    @Output() countChanged = new EventEmitter<number>();
    @Output() marksClicked = new EventEmitter();
    @Output() resetClicked = new EventEmitter();

    constructor() { }

    ngOnInit() {}

    onCountClicked(count: number, event: Event): void {
        console.log('SitenavComponent::onCountClicked', count);
        this.countChanged.emit(count);
    }

    onMarksClicked(event: Event) {
        console.debug('SitenavComponent::onMarksClicked');
        this.marksClicked.emit();
        event.stopImmediatePropagation();
        event.preventDefault();
    }

    onResetClicked(event: Event): void {
        console.debug('SitenavComponent::resetClicked');
        this.resetClicked.emit();
        event.stopImmediatePropagation();
        event.preventDefault();
    }
}
