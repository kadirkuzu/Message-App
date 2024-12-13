import { AuthApiService } from '@/app/services/api/auth.api.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-name-input',
  templateUrl: './name-input.component.html',
  styleUrl: './name-input.component.scss'
})
export class NameInputComponent implements OnInit, OnDestroy {
  @Input({ required: true }) control!: FormControl
  @Input() placeholder = ''
  @Input() label = ''
  @Input() class = ''
  @Input() inputClass = ''
  @Input() theme: 'dark' | 'light' = 'dark'
  @Input() checkUser = false
  @Input() userNameAvailable?:boolean

  unsubscribe$ = new Subject<void>();
  
  constructor(private authApiService:AuthApiService){}

  ngOnInit(): void {
    if(this.checkUser) {
      this.control.valueChanges.pipe(takeUntil(this.unsubscribe$), debounceTime(300)).subscribe(name => {
        if (this.control.invalid) return
        this.authApiService.checkUserNameAvailable(name!).subscribe(data => {
          this.control.setErrors( data.result ? null : {isNotAvailable: !data.result})
          this.userNameAvailable = data.result
        })
      })
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
