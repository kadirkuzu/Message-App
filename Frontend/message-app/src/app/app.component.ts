import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {MessageActions} from "./states/messages/actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'message-app';

  constructor(private store:Store) {
    store.dispatch(MessageActions.getAll())
  }
}
