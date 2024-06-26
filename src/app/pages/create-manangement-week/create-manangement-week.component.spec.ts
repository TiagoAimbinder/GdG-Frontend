import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManangementWeekComponent } from './create-manangement-week.component';

describe('CreateManangementWeekComponent', () => {
  let component: CreateManangementWeekComponent;
  let fixture: ComponentFixture<CreateManangementWeekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateManangementWeekComponent]
    });
    fixture = TestBed.createComponent(CreateManangementWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
