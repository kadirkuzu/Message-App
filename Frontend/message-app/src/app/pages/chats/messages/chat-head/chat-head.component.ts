import { Chat } from '@/app/models/chat';
import { ChatsSelector } from '@/app/states/chats/selectors';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat-head',
  templateUrl: './chat-head.component.html',
  styleUrl: './chat-head.component.scss'
})
export class ChatHeadComponent {
  chat$ = this.store.select(ChatsSelector.getActiveChat)

  getUsersName(chat:Chat){
    return chat.users.map(x=>x.fullName).join(', ')
  }
  
  constructor(private store:Store){}
}
