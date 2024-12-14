import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  @Input({required:true}) tabs!: {
    route:string,
    label:string,
    count$?:Observable<number>
  }[]
}
