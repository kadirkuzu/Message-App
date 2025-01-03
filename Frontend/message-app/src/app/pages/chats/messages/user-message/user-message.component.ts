import { Chat } from '@/app/models/chat';
import { Message } from '@/app/models/message';
import { Component, Input } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrl: './user-message.component.scss'
})
export class UserMessageComponent {
  @Input() message !: Message
  @Input() nextMessage !: Message
  @Input() previousMessage !: Message
  @Input() chat !: Chat

  get showTime () {
    return !this.nextMessage ||
    this.message.sender.id != this.nextMessage.sender.id ||
    moment(this.message.createdDate).format("HH:mm") != moment(this.nextMessage.createdDate).format("HH:mm")
  }

  get showBubble () { return !this.previousMessage ||this.message.sender.id != this.previousMessage.sender.id}
}
