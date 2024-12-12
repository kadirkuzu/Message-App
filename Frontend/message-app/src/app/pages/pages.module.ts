import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatsModule} from "./chats/chats.module";
import {RouterModule} from "@angular/router";
import { AuthModule } from './auth/auth.module';
import {LayoutModule} from "@app/pages/layout/layout.module";
@NgModule({
  imports: [
    CommonModule,
    ChatsModule,
    RouterModule,
    AuthModule,
    LayoutModule
  ],
  exports: [
    LayoutModule
  ]
})
export class PagesModule { }
