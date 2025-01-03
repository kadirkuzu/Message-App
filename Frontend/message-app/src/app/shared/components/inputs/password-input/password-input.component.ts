import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent {
  @Input({required: true}) control!:FormControl
  @Input() placeholder = ''
  @Input() label = ''
  @Input() class = ''
  @Input() theme: 'dark' | 'light' = 'dark'
  @Input() hasError = false

  type : 'password' | 'text' = 'password'

  changeType(){
    this.type = this.type == 'password' ? 'text' : 'password'
  }

}
