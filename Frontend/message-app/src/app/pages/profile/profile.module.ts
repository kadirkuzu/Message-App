import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedModule } from '@/app/shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ProfileComponent, children: [
        {path: '' , redirectTo: 'edit-profile', pathMatch: 'full'},
        {path: 'edit-profile' , component: EditProfileComponent}
      ]}
    ])
  ]
})
export class ProfileModule { }
