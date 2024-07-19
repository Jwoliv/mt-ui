import { Component } from '@angular/core';
import {DatePipe, NgForOf, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Transaction} from "../../../model/transaction.model";
import {
  TransactionButtonsComponent
} from "../../../shared/components/transactions/transcation-buttons/transaction-buttons.component";
import {
  TransactionItemComponent
} from "../../../shared/components/transactions/transaction-item/transaction-item.component";
import {
  AddTransactionComponent
} from "../../../shared/components/transactions/add-transaction/add-transaction.component";

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
export class TransactionsBlockComponent {
  public transactions: Transaction[] = [
    {
      id: 1,
      category: 'Salary',
      type: 'EARNING',
      amount: 300,
      date: new Date(),
      account:  { id: 1, name: 'cash' }
    },
    {
      id: 1,
      category: 'Salary',
      type: 'SPENDING',
      amount: 300,
      date: new Date(),
      account:  { id: 1, name: 'cash' }
    },
    {
      id: 1,
      category: 'Salary',
      type: 'SPENDING',
      amount: 300,
      date: new Date(),
      account:  { id: 1, name: 'cash' }
    }
  ]
}
