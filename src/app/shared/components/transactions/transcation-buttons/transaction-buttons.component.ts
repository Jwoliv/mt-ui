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

  @Output() changeEarning: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeSpending: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeTransfer: EventEmitter<void> = new EventEmitter<void>();

  onChangeAddNewEarningTransaction = () => this.changeEarning.emit();
  onChangeAddNewSpendingTransaction = () => this.changeSpending.emit();
  onChangeAddNewTransferTransfer = () => this.changeTransfer.emit();
}
