import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryManangementWeekComponent } from './history-manangement-week.component';

describe('HistoryManangementWeekComponent', () => {
  let component: HistoryManangementWeekComponent;
  let fixture: ComponentFixture<HistoryManangementWeekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HistoryManangementWeekComponent]
    });
    fixture = TestBed.createComponent(HistoryManangementWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
