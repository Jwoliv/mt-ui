import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsBlockComponent } from './transactions-block.component';

describe('TransactionsBlockComponent', () => {
  let component: TransactionsBlockComponent;
  let fixture: ComponentFixture<TransactionsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
