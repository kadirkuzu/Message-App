import { AddFriendRequestUser } from '@/app/models/user';
import { FriendsApiService } from '@/app/services/api/friends.api.service';
import { UsersApiService } from '@/app/services/api/users.api.service';
import { FriendActions } from '@/app/states/friends/actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-friend-request',
  templateUrl: './new-friend-request.component.html',
  styleUrl: './new-friend-request.component.scss'
})
export class NewFriendRequestComponent implements OnInit, OnDestroy {
  control = new FormControl()

  users: AddFriendRequestUser[] = []

  unsubscribe$ = new Subject<void>();

  constructor(private friendsApiService: FriendsApiService, private usersApiService:UsersApiService,private actions$:Actions) { }

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.unsubscribe$),debounceTime(300)).subscribe(data => {
      if (data.length > 2) {
        this.usersApiService.searchUsers(data).subscribe(data=>{
          this.users = data
        })
      }
    })

    this.actions$.pipe(ofType(FriendActions.addFriendSignalR),takeUntil(this.unsubscribe$)).subscribe(({data})=>{
      this.users = this.users.map(x=>x.id == data.object.userId ? ({...x,isFriend: true}) : x)
    })

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendRequest(receiverId: string) {
    this.friendsApiService.sendFriendRequest(receiverId).subscribe(data=>{
      if(data.result){
        this.users = this.users.map(x=>x.id == receiverId ? ({...x,isSended:true}) : x)
      }
    })
  }

  cancelRequest(receiverId: string) {
    this.friendsApiService.cancelFriendRequest(receiverId).subscribe(data=>{
      if(data.result){
        this.users = this.users.map(x=>x.id == receiverId ? ({...x,isSended:false}) : x)
      }
    })
  }

  onApproveOrReject(receiverId: string){
    this.users = this.users.filter(x=>x.id != receiverId)
  }

}
