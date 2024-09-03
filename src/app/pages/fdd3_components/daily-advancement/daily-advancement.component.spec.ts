import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyAdvancementComponent } from './daily-advancement.component';

describe('DailyAdvancementComponent', () => {
  let component: DailyAdvancementComponent;
  let fixture: ComponentFixture<DailyAdvancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyAdvancementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyAdvancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
