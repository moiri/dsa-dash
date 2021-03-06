import { Directive, Input } from '@angular/core';

@Directive({
    selector : '[href]',
    host : {
        '(click)' : 'doNothing($event)'
    }
})
export class MyLinkDirective {
    @Input() href: string;

    doNothing(event) {
        if(this.href.length === 0 || this.href === '#') {
            event.preventDefault();
        }
    }
}
