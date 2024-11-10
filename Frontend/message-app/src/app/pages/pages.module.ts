import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatsModule} from "./chats/chats.module";
import {RouterModule} from "@angular/router";
@NgModule({
  imports: [
    CommonModule,
    ChatsModule,
    RouterModule
  ]
})
export class PagesModule { }
