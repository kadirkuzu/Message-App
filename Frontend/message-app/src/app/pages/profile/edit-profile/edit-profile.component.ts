import { Patterns } from '@/app/common/helpers/form-patterns';
import { UpdateUserDto, User } from '@/app/models/user';
import { AuthApiService } from '@/app/services/api/auth.api.service';
import { UserActions } from '@/app/states/user/actions';
import { UserSelector } from '@/app/states/user/selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit,OnDestroy {
  form = new FormGroup({
    fullName: new FormControl('', Validators.required),
    userName: new FormControl('', [Validators.required, Validators.pattern(Patterns.UserNamePattern)]),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
  })

  activeUser$ = this.store.select(UserSelector.activeUser)
  uploadLoading$ = this.store.select(UserSelector.uploadLoading)

  user?:User

  unsubscribe$ = new Subject<void>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.activeUser$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.user = data
      this.form.patchValue(data!, { emitEvent: false })
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  discardChanges() {
    this.user && this.form.reset(this.user,{emitEvent:false})
  }

  saveChanges() {
    if(this.form.invalid) return this.form.markAllAsTouched()
    this.store.dispatch(UserActions.updateUser({payload: this.form.value as UpdateUserDto}))
    this.form.reset(this.form.value)
  }

  uploadImage(file:File){
    let formData = new FormData()
    formData.append(this.user?.id!,file)
    this.store.dispatch(UserActions.uploadImage({formData}))
  }
}
