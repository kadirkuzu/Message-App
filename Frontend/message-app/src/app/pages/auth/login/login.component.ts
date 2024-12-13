import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from "@ngrx/store";
import {AuthActions} from "@app/states/auth/actions";
import { LoginDto } from '@/app/models/auth';

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

  get emailOrUserName() {
    return this.form.controls.emailOrUserName
  }

  get password() {
    return this.form.controls.password
  }

  constructor(private store: Store) {
  }

  login() {
    if (this.form.invalid) return this.form.markAllAsTouched()
    this.store.dispatch(AuthActions.login({
      payload: this.form.value as LoginDto
    }))
  }
}
