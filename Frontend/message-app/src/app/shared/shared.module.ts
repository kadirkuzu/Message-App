import { NgModule } from '@angular/core';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { SpinnnerComponent } from './components/spinnner/spinnner.component';
import { PasswordInputComponent } from './components/inputs/password-input/password-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneInputComponent } from './components/inputs/phone-input/phone-input.component';
import { EmailInputComponent } from './components/inputs/email-input/email-input.component';
import { CommonModule } from '@angular/common';
import { NameInputComponent } from './components/inputs/name-input/name-input.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    TextInputComponent,
    SpinnnerComponent,
    PasswordInputComponent,
    PhoneInputComponent,
    EmailInputComponent,
    NameInputComponent
  ],
  exports: [
    TextInputComponent,
    SpinnnerComponent,
    PasswordInputComponent,
    PhoneInputComponent,
    EmailInputComponent,
    NameInputComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
