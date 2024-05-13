import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManangementComponent } from './create-manangement.component';

describe('CreateManangementComponent', () => {
  let component: CreateManangementComponent;
  let fixture: ComponentFixture<CreateManangementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateManangementComponent]
    });
    fixture = TestBed.createComponent(CreateManangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
