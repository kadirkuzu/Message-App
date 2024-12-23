import { NgModule } from '@angular/core';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { SpinnnerComponent } from './components/spinnner/spinnner.component';
import { PasswordInputComponent } from './components/inputs/password-input/password-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneInputComponent } from './components/inputs/phone-input/phone-input.component';
import { EmailInputComponent } from './components/inputs/email-input/email-input.component';
import { CommonModule } from '@angular/common';
import { NameInputComponent } from './components/inputs/name-input/name-input.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { ProfilePhotoComponent } from './components/profile-photo/profile-photo.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { BlobImageDirective } from './directives/blob-image.directive';
import { ApproveRejectFriendRequestComponent } from './components/approve-reject-friend-request/approve-reject-friend-request.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FromNowPipe } from './pipes/from-now.pipe';
import { DateUtcPipe } from './pipes/date-utc.pipe';
import { MultilineInputComponent } from './components/inputs/multiline-input/multiline-input.component';
import { ChatsFilterPipe } from './pipes/chats-filter.pipe';
import { FriendRequestFilterPipe } from './pipes/friend-requests-filter.pipe';
import { FriendsFilterPipe } from './pipes/friends-filter.pipe';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    TextInputComponent,
    SpinnnerComponent,
    PasswordInputComponent,
    PhoneInputComponent,
    EmailInputComponent,
    NameInputComponent,
    TabsComponent,
    ProfilePhotoComponent,
    UploadImageComponent,
    BlobImageDirective,
    ApproveRejectFriendRequestComponent,
    TruncatePipe,
    FromNowPipe,
    DateUtcPipe,
    MultilineInputComponent,
    ChatsFilterPipe,
    FriendRequestFilterPipe,
    FriendsFilterPipe
  ],
  exports: [
    TextInputComponent,
    SpinnnerComponent,
    PasswordInputComponent,
    PhoneInputComponent,
    EmailInputComponent,
    NameInputComponent,
    ReactiveFormsModule,
    FormsModule,
    TabsComponent,
    ProfilePhotoComponent,
    UploadImageComponent,
    BlobImageDirective,
    ApproveRejectFriendRequestComponent,
    TruncatePipe,
    FromNowPipe,
    DateUtcPipe,
    MultilineInputComponent,
    ChatsFilterPipe,
    FriendRequestFilterPipe,
    FriendsFilterPipe
  ]
})
export class SharedModule { }
