import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss'
})
export class PhoneInputComponent {
  @Input({required: true}) control!:FormControl
  @Input() placeholder = ''
  @Input() label = ''
  @Input() class = ''
}
