import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = new FormGroup({
    emailOrUserName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  get emailOrUserName() { return this.form.controls.emailOrUserName}
  get password() { return this.form.controls.password}
}
