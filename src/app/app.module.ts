import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SheetComponent } from './sheet/sheet.component';
import { LimbusComponent } from './limbus/limbus.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { DashComponent } from './dash/dash.component';

import { DocModule } from './doc/doc.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        SheetComponent,
        LimbusComponent,
        NotFoundComponent,
        AboutComponent,
        DashComponent
    ],
    imports: [
        BrowserModule,
        DocModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: []
})
export class AppModule { }
