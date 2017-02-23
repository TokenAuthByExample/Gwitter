import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GweetsComponent }      from './gweets.component';

const routes: Routes = [
  { path: '', redirectTo: '/gweets', pathMatch: 'full' },
  { path: 'gweets',    component: GweetsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
