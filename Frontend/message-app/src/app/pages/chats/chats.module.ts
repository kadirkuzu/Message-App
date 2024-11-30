import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesComponent} from "./messages/messages.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '' , component: MessagesComponent}
    ])
  ]
})
export class ChatsModule {
}
