import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchTimeComponent } from './lunch-time.component';

describe('LunchTimeComponent', () => {
  let component: LunchTimeComponent;
  let fixture: ComponentFixture<LunchTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LunchTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
