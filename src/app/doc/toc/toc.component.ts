import { Component, OnInit } from '@angular/core';
import { TocService, TocItem } from './toc.service';

@Component({
    selector: '.doc-toc',
    templateUrl: './toc.component.html',
})
export class TocComponent implements OnInit {
    private chapters: TocItem[];

    constructor( private tocService: TocService ) { }

    ngOnInit() {
        this.chapters = this.tocService.getList( 'chap' );
    }
}
