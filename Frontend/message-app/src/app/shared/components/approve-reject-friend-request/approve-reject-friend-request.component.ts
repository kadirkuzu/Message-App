import { FriendActions } from '@/app/states/friends/actions';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-approve-reject-friend-request',
  templateUrl: './approve-reject-friend-request.component.html',
  styleUrl: './approve-reject-friend-request.component.scss'
})
export class ApproveRejectFriendRequestComponent {
  @Input({required: true}) friendRequestId!:string
  @Input({required: true}) senderId!:string

  @Output() onApprove = new EventEmitter()
  @Output() onReject = new EventEmitter()

  constructor(private store:Store){}

  approve(){
    this.onApprove.emit(true)
    this.store.dispatch(FriendActions.approveFriendRequest({
      friendRequestId: this.friendRequestId,
      senderId: this.senderId
    }))
  }

  reject(){
    this.onReject.emit(true)
    this.store.dispatch(FriendActions.rejectFriendRequest({
      friendRequestId: this.friendRequestId,
      senderId: this.senderId
    }))
  }
}
