import { Message } from '@/app/models/message';
import { ChatsSelector } from '@/app/states/chats/selectors';
import { MessageActions } from '@/app/states/messages/actions';
import { MessagesSelector } from '@/app/states/messages/selectors';
import { UserSelector } from '@/app/states/user/selectors';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import moment from 'moment';
import { skipWhile, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit, AfterViewInit {
  @ViewChild('messagesArea') messagesArea?: ElementRef

  messages$ = this.store.select(MessagesSelector.getAll)
  chat$ = this.store.select(ChatsSelector.getActiveChat)
  getIsAdminChat$ = this.store.select(ChatsSelector.getIsAdminChat)
  activeUser$ = this.store.select(UserSelector.activeUser)
  unsubscribe$ = new Subject<void>();

  messageCtrl = new FormControl()
  messages:Message[] = []

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.store.dispatch(MessageActions.getAll({chatId:params['id']}))
    })
  }

  ngAfterViewInit(): void {
    this.messages$.pipe(takeUntil(this.unsubscribe$)).subscribe((data)=>{
      this.messages = data
      setTimeout(() => {
        this.messagesArea!.nativeElement.scrollTop = this.messagesArea!.nativeElement.scrollHeight;
      }, 0);
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendMessage(){
    if(!this.messageCtrl.value?.trim()) return
    this.store.dispatch(MessageActions.sendMessage({content: this.messageCtrl.value}))
    this.messageCtrl.reset()
  }

  showDate(message:Message,previousMessage:Message){
    return !previousMessage ||
            moment(message.createdDate).format("MM/DD/YYYY") != moment(previousMessage.createdDate).format("MM/DD/YYYY")
  }

}
