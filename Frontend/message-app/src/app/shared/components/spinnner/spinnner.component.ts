import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinnner',
  templateUrl: './spinnner.component.html',
  styleUrl: './spinnner.component.scss'
})
export class SpinnnerComponent {
  @Input() marginLeft = 0
}
