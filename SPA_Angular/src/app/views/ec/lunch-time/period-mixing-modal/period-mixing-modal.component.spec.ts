import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodMixingModalComponent } from './period-mixing-modal.component';

describe('PeriodMixingModalComponent', () => {
  let component: PeriodMixingModalComponent;
  let fixture: ComponentFixture<PeriodMixingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodMixingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodMixingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
