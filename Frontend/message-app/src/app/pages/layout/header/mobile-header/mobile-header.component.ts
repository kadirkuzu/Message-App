import { AuthActions } from '@/app/states/auth/actions';
import { UserSelector } from '@/app/states/user/selectors';
import { Component} from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss'
})
export class MobileHeaderComponent {
  openBar = false
  activeUser$ = this.store.select(UserSelector.activeUser)
  uploadLoading$ = this.store.select(UserSelector.uploadLoading)

  constructor(private store: Store){}

  logout(){
    this.store.dispatch(AuthActions.logout())
  }
}
