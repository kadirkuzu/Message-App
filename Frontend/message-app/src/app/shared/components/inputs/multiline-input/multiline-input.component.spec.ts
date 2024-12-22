import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilineInputComponent } from './multiline-input.component';

describe('MultilineInputComponent', () => {
  let component: MultilineInputComponent;
  let fixture: ComponentFixture<MultilineInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultilineInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultilineInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
