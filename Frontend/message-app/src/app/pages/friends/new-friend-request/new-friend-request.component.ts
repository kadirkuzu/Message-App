import { AddFriendRequestUser } from '@/app/models/user';
import { FriendsApiService } from '@/app/services/api/friends.api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  constructor(private friendsApiService: FriendsApiService) { }

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.unsubscribe$),debounceTime(300)).subscribe(data => {
      if (data.length > 2) {
        this.friendsApiService.searchUsers(data).subscribe(data=>{
          this.users = data
        })
      }
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

}
