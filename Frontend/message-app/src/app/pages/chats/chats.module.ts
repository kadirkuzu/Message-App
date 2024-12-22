import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesComponent} from "./messages/messages.component";
import {RouterModule} from "@angular/router";
import { CreateChatPageComponent } from './create-chat-page/create-chat-page.component';
import { SharedModule } from '@/app/shared/shared.module';
import { ChatsComponent } from './chats.component';
import { FriendsBarComponent } from './friends-bar/friends-bar.component';
import { ChatHeadComponent } from './messages/chat-head/chat-head.component';
import { UserMessageComponent } from './messages/user-message/user-message.component';
import { ChatMessageComponent } from './messages/chat-message/chat-message.component';

@NgModule({
  declarations: [
    MessagesComponent,
    ChatsComponent,
    CreateChatPageComponent,
    FriendsBarComponent,
    ChatHeadComponent,
    UserMessageComponent,
    ChatMessageComponent,
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
