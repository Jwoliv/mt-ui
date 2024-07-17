import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyStockComponent } from './daily-stock.component';

describe('DailyStockComponent', () => {
  let component: DailyStockComponent;
  let fixture: ComponentFixture<DailyStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
