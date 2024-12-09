import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.scss'
})
export class EmailInputComponent {
  @Input({required: true}) control!:FormControl
  @Input() placeholder = ''
  @Input() label = ''
  @Input() class = ''
}
