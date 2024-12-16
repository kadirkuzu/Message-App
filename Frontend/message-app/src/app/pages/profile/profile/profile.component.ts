import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(public router:Router, public activatedRoute:ActivatedRoute){}
}
