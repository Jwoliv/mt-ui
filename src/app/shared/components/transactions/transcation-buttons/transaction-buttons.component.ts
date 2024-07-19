import {Component, EventEmitter, Output} from '@angular/core';
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

  @Output() changeEarning: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changeSpending: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changeTransfer: EventEmitter<boolean> = new EventEmitter<boolean>();

  onChangeAddNewEarningTransaction = () => this.changeEarning.emit(true);
  onChangeAddNewSpendingTransaction = () => this.changeSpending.emit(true);
  onChangeAddNewTransferTransfer = () => this.changeTransfer.emit(true);
}
