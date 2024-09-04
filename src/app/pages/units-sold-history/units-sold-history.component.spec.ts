import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsSoldHistoryComponent } from './units-sold-history.component';

describe('UnitsSoldHistoryComponent', () => {
  let component: UnitsSoldHistoryComponent;
  let fixture: ComponentFixture<UnitsSoldHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UnitsSoldHistoryComponent]
    });
    fixture = TestBed.createComponent(UnitsSoldHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
