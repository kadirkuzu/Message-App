import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages/pages.routing.module';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    PagesRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
