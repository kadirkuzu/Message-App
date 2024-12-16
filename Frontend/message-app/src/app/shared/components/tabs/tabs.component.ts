import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent implements OnInit{
  @Input({required:true}) activatedRoute!: ActivatedRoute
  @Input({required:true}) router!: Router
  @Input({required:true}) tabs!: {
    route:string,
    label:string,
    count$?:Observable<number>
  }[]

  windowWidth = window.innerWidth
  title = ''

  unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.setTitle(this.activatedRoute.firstChild?.routeConfig?.path!)
    this.router.events.pipe(takeUntil(this.unsubscribe$),filter(event => event instanceof NavigationEnd)).subscribe(x=>{
      this.setTitle(this.activatedRoute.firstChild?.routeConfig?.path!)
    })
  }

  setTitle(route:string){
    this.title = this.tabs.find(x=>x.route == route)?.label!
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
