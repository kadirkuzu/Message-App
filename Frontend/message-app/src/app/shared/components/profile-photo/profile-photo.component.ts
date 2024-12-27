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
  @Input({ required: true }) hasPhoto = false
  @Input({ required: true }) id = ''
  @Input() isGroup = false
  @Input() isLoading = false

  groupImageContainer = environment.groupImageContainer
  userImageContainer = environment.userImageContainer
}
