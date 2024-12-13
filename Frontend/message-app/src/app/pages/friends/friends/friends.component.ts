import { Component } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {
  tabs = [
    {
      route: 'all-friends',
      label: 'All Friends'
    },
    {
      route: 'new-friend-request',
      label: 'New Friend'
    },
    {
      route: 'friend-requests',
      label: 'Friend Requests'
    }
  ]
}
