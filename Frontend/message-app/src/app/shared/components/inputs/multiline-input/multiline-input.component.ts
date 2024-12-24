import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multiline-input',
  templateUrl: './multiline-input.component.html',
  styleUrl: './multiline-input.component.scss'
})
export class MultilineInputComponent {
  @Input({required: true}) control!:FormControl
  @Input() placeholder = ''
  @Input() label = ''
  @Input() class = ''
  @Input() theme: 'dark' | 'light' = 'dark'
  @Input() rows = 2
}
