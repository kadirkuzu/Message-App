import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    CreateAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'login', component: LoginComponent},
      {path: 'create-account', component: CreateAccountComponent},
    ]),
    SharedModule
  ]
})
export class AuthModule { }
