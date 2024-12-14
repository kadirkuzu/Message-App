import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { MobileHeaderComponent } from './header/mobile-header/mobile-header.component';
import { AppRoutingModule } from '@/app/app-routing.module';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    HeaderComponent,
    MobileHeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    SharedModule
]
})
export class LayoutModule { }
