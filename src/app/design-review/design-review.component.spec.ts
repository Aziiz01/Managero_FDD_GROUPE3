import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignReviewComponent } from './design-review.component';

describe('DesignReviewComponent', () => {
  let component: DesignReviewComponent;
  let fixture: ComponentFixture<DesignReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
