import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { AuthActions } from "@app/states/auth/actions";
import { LoginDto } from '@/app/models/auth';
import { AuthApiService } from '@/app/services/api/auth.api.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit,OnDestroy {
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

  errorMessage = ''
  loading = false

  unsubscribe$ = new Subject<void>();
  
  constructor(private store: Store, private authApiService: AuthApiService) { }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.errorMessage = ''
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  login() {
    if (this.form.invalid) return this.form.markAllAsTouched()

    this.loading = true

    this.authApiService.login(this.form.value as LoginDto).subscribe({
      next: (payload) => {
        this.store.dispatch(AuthActions.login({ payload }))
      },
      error: (err) => {
        this.errorMessage = err.error.Message
        this.loading = false
      },
    })
  }
}
