import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  tabs = [
    {
      route: 'edit-profile',
      label: 'Edit Profile',
    },
  ]
}
