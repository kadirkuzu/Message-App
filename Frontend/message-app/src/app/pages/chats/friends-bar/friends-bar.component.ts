import { ChatsSelector } from '@/app/states/chats/selectors';
import { UserSelector } from '@/app/states/user/selectors';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-friends-bar',
  templateUrl: './friends-bar.component.html',
  styleUrl: './friends-bar.component.scss'
})
export class FriendsBarComponent {
  chats$ = this.store.select(ChatsSelector.getAllFiltered)
  user$ = this.store.select(UserSelector.activeUser)

  search = new FormControl()

  constructor(private store: Store){}
}
