import {Component} from '@angular/core';
import {NewFormComponent} from "../../new-form/new-form.component";
import {NgForOf} from "@angular/common";
import {TransactionButtonsComponent} from "../transcation-buttons/transaction-buttons.component";

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    NewFormComponent,
    NgForOf,
    TransactionButtonsComponent
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss'
})
export class AddTransactionComponent {
  public data = {
    earningCategories: ['Salary', 'Investment', 'Company'],
    spendingCategories: ['Food', 'Transport', 'Tech', 'Study'],
    accounts: ['Cash', 'Universal Card', 'Dollars'],
    total: 20000
  }

  public isShowNewEarning = false
  public isShowNewSpending = false
  public isShowNewTransfer = false

  onChangeAddNewEarningTransaction = (status: boolean) => {
    this.isShowNewEarning = status;
  }
  onChangeAddNewSpendingTransaction = (status: boolean) => {
    this.isShowNewSpending = status;
  }
  onChangeAddNewTransferTransaction = (status: boolean) => {
    this.isShowNewTransfer = status;
  }
}
