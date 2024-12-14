import { Friend } from '@/app/models/friend-requets';
import { FriendsSelector } from '@/app/states/friends/selectors';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrl: './all-friends.component.scss'
})
export class AllFriendsComponent {

  friends$ = this.store.select(FriendsSelector.friends)

  control = new FormControl()

  friends: Friend[] = []

  unsubscribe$ = new Subject<void>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.friends$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.friends = data
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
