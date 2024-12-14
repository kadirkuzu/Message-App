import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { SignalRService } from './services/signalR/signalR.service';
import { UserActions } from './states/user/actions';
import { UserSelector } from './states/user/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'message-app';
  loggedIn$ = this.store.select(UserSelector.loggedIn)

  constructor(private authService:AuthService,private store:Store, private signalRService:SignalRService){
    signalRService.start()
    if(this.authService.isLoggedIn()) {
      this.store.dispatch(UserActions.getUser())
    }
  }
}
