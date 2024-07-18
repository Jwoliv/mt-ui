import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionButtonsComponent } from './transaction-buttons.component';

describe('TranscationButtonsComponent', () => {
  let component: TransactionButtonsComponent;
  let fixture: ComponentFixture<TransactionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
