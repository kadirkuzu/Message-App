import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesComponent} from "./messages/messages.component";
import {RouterModule} from "@angular/router";
import { CreateChatPageComponent } from './create-chat-page/create-chat-page.component';
import { SharedModule } from '@/app/shared/shared.module';
import { ChatsComponent } from './chats.component';
import { FriendsBarComponent } from './friends-bar/friends-bar.component';

@NgModule({
  declarations: [
    MessagesComponent,
    ChatsComponent,
    CreateChatPageComponent,
    FriendsBarComponent,
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
