import { AuthActions } from '@/app/states/auth/actions';
import { UserSelector } from '@/app/states/user/selectors';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  windowWidth = window.innerWidth
  activeUser$ = this.store.select(UserSelector.activeUser)
  uploadLoading$ = this.store.select(UserSelector.uploadLoading)

  constructor(private store:Store){}

  logout(){
    this.store.dispatch(AuthActions.logout())
  }
}
