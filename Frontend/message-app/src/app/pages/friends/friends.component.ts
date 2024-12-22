import { FriendsSelector } from '@/app/states/friends/selectors';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {

  friendRequestCount$ = this.store.select(FriendsSelector.friendRequests).pipe(map(x=>x.length))
  friendsCount$ = this.store.select(FriendsSelector.friends).pipe(map(x=>x.length))

  tabs = [
    {
      route: 'all-friends',
      label: 'All Friends',
      count$: this.friendsCount$
    },
    {
      route: 'new-friend-request',
      label: 'New Friend'
    },
    {
      route: 'friend-requests',
      label: 'Friend Requests',
      count$: this.friendRequestCount$
    }
  ]

  constructor(private store:Store,public activatedRoute:ActivatedRoute,public router:Router){ }
}
