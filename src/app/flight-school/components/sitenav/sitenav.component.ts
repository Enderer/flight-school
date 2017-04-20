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

    onCountClicked(count: number): void {
        console.log('SitenavComponent::onCountClicked', count);
        this.countChanged.emit(count);
    }

    onMarksClicked() {
        console.debug('SitenavComponent::onMarksClicked');
        this.marksClicked.emit();
    }

    onResetClicked(): void {
        console.debug('SitenavComponent::resetClicked');
        this.resetClicked.emit();
    }
    
}
