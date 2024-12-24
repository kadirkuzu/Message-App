import { Chat } from '@/app/models/chat';
import { ChatActions } from '@/app/states/chats/actions';
import { ChatsSelector } from '@/app/states/chats/selectors';
import { environment } from '@/environments/environment';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat-head',
  templateUrl: './chat-head.component.html',
  styleUrl: './chat-head.component.scss'
})
export class ChatHeadComponent {
  chat$ = this.store.select(ChatsSelector.getActiveChat)

  adminUserName = environment.superAdminUserName

  constructor(private store: Store) { }

  getUsersName(chat: Chat) {
    return chat.users.map(x => '@' + x.userName).join(', ')
  }

  uploadImage(chatId:string, image:File){
    let formData = new FormData()
    formData.append(chatId,image)
    this.store.dispatch(ChatActions.uploadImage({chatId,formData}))
  }

}
