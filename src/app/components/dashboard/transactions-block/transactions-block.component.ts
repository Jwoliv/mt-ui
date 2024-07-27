import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgForOf, NgStyle, UpperCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TransactionDashboard} from "../../../model/api-model/transaction.model";
import {
  TransactionButtonsComponent
} from "../../../shared/components/transactions/transcation-buttons/transaction-buttons.component";
import {
  TransactionItemComponent
} from "../../../shared/components/transactions/transaction-item/transaction-item.component";
import {
  AddTransactionComponent
} from "../../../shared/components/transactions/add-transaction/add-transaction.component";
import {UpperTitleUiComponent} from "../../../shared/components/upper-title-ui/upper-title-ui.component";

@Component({
  selector: 'app-transactions-block',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    DatePipe,
    NgStyle,
    TransactionButtonsComponent,
    TransactionItemComponent,
    AddTransactionComponent,
    UpperCasePipe,
    UpperTitleUiComponent
  ],
  templateUrl: './transactions-block.component.html',
  styleUrl: './transactions-block.component.scss'
})
export class TransactionsBlockComponent {
  @Output() public updateDayStock: EventEmitter<TransactionDashboard> = new EventEmitter<TransactionDashboard>();
  @Input() public transactions: TransactionDashboard[] = []

  public updateTransactions(transaction: TransactionDashboard) {
    this.transactions.unshift(transaction);
    this.transactions = this.transactions.slice(0, 3)
    this.updateDayStock.emit(transaction);
  }
}
