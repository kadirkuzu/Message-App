import { UserSelector } from '@/app/states/user/selectors';
import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Store} from '@ngrx/store';
import {map, Subject, takeUntil} from 'rxjs';

@Directive({
  selector: '[ifAdmin]'
})

export class IfAdminDirective implements OnInit, OnDestroy {
  @Input() ifAdmin = true

  roles$ = this.store.select(UserSelector.activeUser).pipe(map(x=>x?.roles));
  unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private view: ViewContainerRef, private template: TemplateRef<any>) {
  }

  ngOnInit(): void {
    this.roles$.pipe(takeUntil(this.unsubscribe$)).subscribe(roles => {
      let isAdmin = roles?.includes('SuperAdmin') || roles?.includes('Admin')
      if (isAdmin == this.ifAdmin) {
        this.createView()
      } else {
        this.clearView()
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private createView() {
    this.view.clear()
    this.view.createEmbeddedView(this.template)
  }

  private clearView() {
    this.view.clear()
  }
}
