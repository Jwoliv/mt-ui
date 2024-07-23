import {Component, inject, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TransactionDashboard} from "../../../model/transaction.model";
import {
  TransactionButtonsComponent
} from "../../../shared/components/transactions/transcation-buttons/transaction-buttons.component";
import {
  TransactionItemComponent
} from "../../../shared/components/transactions/transaction-item/transaction-item.component";
import {
  AddTransactionComponent
} from "../../../shared/components/transactions/add-transaction/add-transaction.component";
import {TransactionService} from "../../../services/transaction.service";

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
    AddTransactionComponent
  ],
  templateUrl: './transactions-block.component.html',
  styleUrl: './transactions-block.component.scss'
})
export class TransactionsBlockComponent implements OnInit {
  public transactionService: TransactionService = inject(TransactionService);

  public transactions: TransactionDashboard[] = []

  ngOnInit() {
    this.transactionService.getTransactionForDashboard().subscribe({
      next: (transactions: TransactionDashboard[]) => {
        console.log(transactions)
        this.transactions = transactions
      }
    })
  }
}
