import { Patterns } from '@/app/common/helpers/form-patterns';
import { User } from '@/app/models/user';
import { AuthSelector } from '@/app/states/auth/selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';

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
    password: new FormControl('', Validators.required)
  })

  activeUser$ = this.store.select(AuthSelector.activeUser)

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

  }
}
