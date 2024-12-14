import { AuthSelector } from '@/app/states/auth/selectors';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  windowWidth = window.innerWidth
  activeUser$ = this.store.select(AuthSelector.activeUser)

  constructor(private store:Store){}
}
