import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SheetComponent } from './sheet/sheet.component';
import { LimbusComponent } from './limbus/limbus.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { DashComponent } from './dash/dash.component';
import { DocComponent } from './doc/doc.component';

export const routes: Routes = [
    { path: '', component: DashComponent },
    { path: 'doc', component: DocComponent },
    // { path: 'doc/:chap/:topic', component: DocComponent },
    { path: 'sheet', component: SheetComponent },
    { path: 'limbus', component: LimbusComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
