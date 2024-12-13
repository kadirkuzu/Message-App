import { AuthActions } from '@/app/states/auth/actions';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss'
})
export class MobileHeaderComponent {
  openBar = false

  constructor(private store: Store){}

  logout(){
    this.store.dispatch(AuthActions.logout())
  }
}
