import { NgModule } from '@angular/core';
import { TextInputComponent } from './components/inputs/text-input/text-input.component';
import { SpinnnerComponent } from './components/spinnner/spinnner.component';
import { PasswordInputComponent } from './components/inputs/password-input/password-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    TextInputComponent,
    SpinnnerComponent,
    PasswordInputComponent
  ],
  exports: [
    TextInputComponent,
    SpinnnerComponent,
    PasswordInputComponent
  ]
})
export class SharedModule { }
