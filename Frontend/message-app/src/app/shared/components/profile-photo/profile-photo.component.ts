import { environment } from '@/environments/environment';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.scss'
})
export class ProfilePhotoComponent {
  @Input() height = 60
  @Input() borderRadius = '100%'
  @Input() hasPhoto = false
  @Input() id = ''
  @Input() isGroup = false
  @Input() isLoading = false

  groupImageContainer = environment.groupImageContainer
  userImageContainer = environment.userImageContainer
}
