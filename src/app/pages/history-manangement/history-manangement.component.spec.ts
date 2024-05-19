import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryManangementComponent } from './history-manangement.component';

describe('HistoryManangementComponent', () => {
  let component: HistoryManangementComponent;
  let fixture: ComponentFixture<HistoryManangementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HistoryManangementComponent]
    });
    fixture = TestBed.createComponent(HistoryManangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
