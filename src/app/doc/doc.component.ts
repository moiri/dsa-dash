import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-doc',
    templateUrl: './doc.component.html'
})
export class DocComponent {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        // private service: DocService
    ) {}

    ngOnInit() {
        // this.doc$ = this.route.paramMap.switchMap((params: ParamMap) =>
        //     this.service.getDoc( params.get( 'chap' ), params.get( 'topic' ) ) );
    }
}
