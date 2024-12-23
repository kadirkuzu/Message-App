import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllFriendsComponent } from './all-friends/all-friends.component';
import { RouterModule } from '@angular/router';
import { FriendsComponent } from './friends.component';
import { SharedModule } from '@/app/shared/shared.module';
import { NewFriendRequestComponent } from './new-friend-request/new-friend-request.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';

@NgModule({
  declarations: [
    AllFriendsComponent,
    FriendsComponent,
    NewFriendRequestComponent,
    FriendRequestsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: FriendsComponent , children : [
        {path: '', redirectTo: 'all-friends', pathMatch: 'full'},
        {path: 'all-friends', component: AllFriendsComponent},
        {path: 'new-friend-request', component: NewFriendRequestComponent},
        {path: 'friend-requests', component: FriendRequestsComponent},
      ]},
    ])
  ]
})
export class FriendsModule { }
