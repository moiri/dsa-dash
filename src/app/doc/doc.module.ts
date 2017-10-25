import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { DocComponent } from './doc.component';
import { TocComponent } from './toc/toc.component';

import { TocService } from './toc/toc.service';

@NgModule({
    declarations: [
        DocComponent,
        TocComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
    ],
    providers: [TocService],
    entryComponents: []
})
export class DocModule { }
