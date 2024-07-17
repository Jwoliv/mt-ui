import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsBlockComponent } from './accounts-block.component';

describe('AccountsBlockComponent', () => {
  let component: AccountsBlockComponent;
  let fixture: ComponentFixture<AccountsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
