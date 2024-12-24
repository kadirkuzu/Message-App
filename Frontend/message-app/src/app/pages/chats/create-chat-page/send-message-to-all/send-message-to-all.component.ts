import { MessageActions } from '@/app/states/messages/actions';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-send-message-to-all',
  templateUrl: './send-message-to-all.component.html',
  styleUrl: './send-message-to-all.component.scss',
})
export class SendMessageToAllComponent {
  formControl = new FormControl('', Validators.required);

  constructor(private store: Store){}

  clear() {
    this.formControl.reset();
  }

  send(element: HTMLButtonElement) {
    if (this.formControl.invalid) return this.formControl.markAsTouched();

    this.store.dispatch(MessageActions.sendMessageToAll({content: this.formControl.value!}))
    element.click();
  }
}
