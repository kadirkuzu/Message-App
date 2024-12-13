import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { AuthActions } from './states/auth/actions';
import { AuthSelector } from './states/auth/selectors';
import { SignalRService } from './services/signalR.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'message-app';
  loggedIn$ = this.store.select(AuthSelector.loggedIn)

  constructor(private authService:AuthService,private store:Store, private signalRService:SignalRService){
    signalRService.start()
    if(this.authService.isLoggedIn()) {
      this.store.dispatch(AuthActions.getUser())
    }
  }
}
