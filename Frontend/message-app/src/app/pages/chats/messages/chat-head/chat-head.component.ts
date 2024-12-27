import { Chat } from '@/app/models/chat';
import { ChatActions } from '@/app/states/chats/actions';
import { ChatsSelector } from '@/app/states/chats/selectors';
import { environment } from '@/environments/environment';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat-head',
  templateUrl: './chat-head.component.html',
  styleUrl: './chat-head.component.scss'
})
export class ChatHeadComponent implements OnInit, OnDestroy {
  chat$ = this.store.select(ChatsSelector.getActiveChat)
  imageLoadings$ = this.store.select(ChatsSelector.imageLoadings)

  adminUserName = environment.superAdminUserName

  showDetails = false

  title = new FormControl('',Validators.required)

  unsubscribe$ = new Subject<void>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.chat$.pipe(takeUntil(this.unsubscribe$)).subscribe(data=>{
      this.title.patchValue(data?.title!)
    })
  }

  saveTitle(){
    if(this.title.invalid) return this.title.markAsTouched()
    this.store.dispatch(ChatActions.updateTitle({title: this.title.value!}))
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUsersName(chat: Chat) {
    return chat.users.map(x => '@' + x.userName).join(', ')
  }

  uploadImage(chatId:string, image:File){
    let formData = new FormData()
    formData.append(chatId,image)
    this.store.dispatch(ChatActions.uploadImage({chatId,formData}))
  }

}
