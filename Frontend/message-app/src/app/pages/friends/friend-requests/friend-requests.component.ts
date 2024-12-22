import { FriendRequest } from '@/app/models/friend-requets';
import { FriendsSelector } from '@/app/states/friends/selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrl: './friend-requests.component.scss'
})
export class FriendRequestsComponent implements OnInit,OnDestroy {

  friendRequests$ = this.store.select(FriendsSelector.friendRequests)

  control = new FormControl()

  friendRequests:FriendRequest[] = []

  unsubscribe$ = new Subject<void>();

  constructor(private store: Store){}

  ngOnInit(): void {
    this.friendRequests$.pipe(takeUntil(this.unsubscribe$)).subscribe(data=>{
      this.friendRequests = data
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
