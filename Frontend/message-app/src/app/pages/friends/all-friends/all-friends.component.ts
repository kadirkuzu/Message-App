import { Friend } from '@/app/models/friend-requets';
import { ChatsSelector } from '@/app/states/chats/selectors';
import { FriendActions } from '@/app/states/friends/actions';
import { FriendsSelector } from '@/app/states/friends/selectors';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrl: './all-friends.component.scss'
})
export class AllFriendsComponent {

  friends$ = this.store.select(FriendsSelector.friends)
  chats$ = this.store.select(ChatsSelector.getAll)

  control = new FormControl()

  friends: Friend[] = []

  unsubscribe$ = new Subject<void>();

  constructor(private store: Store,private router:Router) { }

  ngOnInit(): void {
    this.friends$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.friends = data
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  remove(friendRequestId: string) {
    this.store.dispatch(FriendActions.removeFriend({friendRequestId}))
  }

  sendMessage(userId: string){
    this.chats$.pipe(take(1)).subscribe(chats=> {
      let chat = chats.find(x=>x.users.length == 1 && x.users[0].id == userId)
      this.router.navigateByUrl('chats/' + chat?.id)
    })
  }

}
