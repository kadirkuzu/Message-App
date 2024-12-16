import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesComponent} from "./messages/messages.component";
import {RouterModule} from "@angular/router";
import { ChatsComponent } from './chats/chats.component';
import { CreateChatPageComponent } from './create-chat-page/create-chat-page.component';
import { SharedModule } from '@/app/shared/shared.module';

@NgModule({
  declarations: [
    MessagesComponent,
    ChatsComponent,
    CreateChatPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ChatsComponent , children : [
        {path: '', component: CreateChatPageComponent},
        {path: ':id', component: MessagesComponent},
      ]},
    ])
  ]
})
export class ChatsModule {
}
