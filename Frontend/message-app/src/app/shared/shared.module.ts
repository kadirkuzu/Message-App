import { NgModule } from '@angular/core';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { SpinnnerComponent } from './components/spinnner/spinnner.component';
import { PasswordInputComponent } from './components/inputs/password-input/password-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneInputComponent } from './components/inputs/phone-input/phone-input.component';
import { EmailInputComponent } from './components/inputs/email-input/email-input.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    TextInputComponent,
    SpinnnerComponent,
    PasswordInputComponent,
    PhoneInputComponent,
    EmailInputComponent
  ],
  exports: [
    TextInputComponent,
    SpinnnerComponent,
    PasswordInputComponent,
    PhoneInputComponent,
    EmailInputComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
