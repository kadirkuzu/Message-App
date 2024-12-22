import { ChatsSelector } from '@/app/states/chats/selectors';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-friends-bar',
  templateUrl: './friends-bar.component.html',
  styleUrl: './friends-bar.component.scss'
})
export class FriendsBarComponent {
  chats$ = this.store.select(ChatsSelector.getAllFiltered)

  constructor(private store: Store){}
}
