import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskDetectionRateComponent } from './risk-detection-rate.component';

describe('RiskDetectionRateComponent', () => {
  let component: RiskDetectionRateComponent;
  let fixture: ComponentFixture<RiskDetectionRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskDetectionRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskDetectionRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
