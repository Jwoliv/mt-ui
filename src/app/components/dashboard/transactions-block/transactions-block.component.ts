import { Component } from '@angular/core';
import {DatePipe, NgForOf, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TransactionButtonsComponent} from "./transcation-buttons/transaction-buttons.component";
import {Transaction} from "../../../model/transaction.model";
import {TransactionItemComponent} from "./transaction-item/transaction-item.component";

@Component({
  selector: 'app-transactions-block',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    DatePipe,
    NgStyle,
    TransactionButtonsComponent,
    TransactionItemComponent
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
