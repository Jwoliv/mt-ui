import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {NewFormComponent} from "../../new-form/new-form.component";

@Component({
  selector: 'app-transaction-buttons',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NewFormComponent
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

  onChangeAddNewEarningTransaction = (status: boolean) => this.isShowNewEarning = status;
  onChangeAddNewSpendingTransaction = (status: boolean) => this.isShowNewSpending = status;
  onChangeAddNewTransferTransaction = (status: boolean) => this.isShowNewTransaction = status;
}
