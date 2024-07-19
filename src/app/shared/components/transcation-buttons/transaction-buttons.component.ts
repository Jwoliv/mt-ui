import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-transaction-buttons',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './transaction-buttons.component.html',
  styleUrl: './transaction-buttons.component.scss'
})
export class TransactionButtonsComponent {
  public data = {
    earningCategories: ['Salary', 'Investment', 'Company'],
    spendingCategories: ['Food', 'Transport', 'Tech', 'Study'],
    accounts: ['Cash', 'Universal Card', 'Dollars'],
    total: 20000
  }

  public isShowNewEarning = false
  public isShowNewSpending = false
  public isShowNewTransaction = false
  protected readonly close = close;

  onShowAddNewEarningTransaction() {
    this.isShowNewEarning = true;
  }

  onShowAddNewSpendingTransaction() {

    this.isShowNewSpending = true;
  }

  onShowAddNewTransferTransaction() {

    this.isShowNewTransaction = true;
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  onCloseForms() {
    this.isShowNewSpending = false;
    this.isShowNewEarning = false;
    this.isShowNewTransaction = false;
  }
}
