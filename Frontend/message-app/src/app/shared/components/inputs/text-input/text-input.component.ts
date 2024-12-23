import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input({required: true}) control!:FormControl
  @Input() placeholder = ''
  @Input() label = ''
  @Input() class = ''
  @Input() icon = ''
  @Input() theme: 'dark' | 'light' = 'dark'
  @Input() borderless = false

  isFocused = false
}
