import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCompletionRateComponent } from './task-completion-rate.component';

describe('TaskCompletionRateComponent', () => {
  let component: TaskCompletionRateComponent;
  let fixture: ComponentFixture<TaskCompletionRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCompletionRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCompletionRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
