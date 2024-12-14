import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.scss'
})
export class ProfilePhotoComponent {
  @Input() height = 40
  @Input() borderRadius = '100%'
}
