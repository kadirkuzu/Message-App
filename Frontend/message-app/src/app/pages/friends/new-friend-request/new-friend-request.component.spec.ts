import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFriendRequestComponent } from './new-friend-request.component';

describe('NewFriendRequestComponent', () => {
  let component: NewFriendRequestComponent;
  let fixture: ComponentFixture<NewFriendRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewFriendRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewFriendRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
