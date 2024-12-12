import { AuthActions } from '@/app/states/auth/actions';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  form = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  get email() { return this.form.controls.email}
  get fullName() { return this.form.controls.fullName}
  get phoneNumber() { return this.form.controls.phoneNumber}
  get password() { return this.form.controls.password}

  constructor(private store:Store){}

  createAccount(){
    if(this.form.invalid) return this.form.markAllAsTouched()
    this.store.dispatch(AuthActions.createAccount({payload: this.form.value}))
  }

}
