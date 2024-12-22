import { FriendsSelector } from '@/app/states/friends/selectors';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-chat-page',
  templateUrl: './create-chat-page.component.html',
  styleUrl: './create-chat-page.component.scss'
})
export class CreateChatPageComponent {
  friends$ = this.store.select(FriendsSelector.friends)

  constructor(private store:Store){}
}
