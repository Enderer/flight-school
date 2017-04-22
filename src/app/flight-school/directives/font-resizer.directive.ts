import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[fs-font-resizer]'
})
export class FontResizerDirective {

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        console.debug('FontResizerDirective::onResize', event.target);
        this.setFontSize();
    }

    constructor() {
        this.setFontSize();
    }

    private setFontSize(): void {
        console.debug('FontResizerDirective::setFontSize');
        const height = window.innerHeight;
        const fontSize = height * 0.0018;
        document.documentElement.style.fontSize = fontSize + 'em';
    }
}
