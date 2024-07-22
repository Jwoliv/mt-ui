import { Component } from '@angular/core';
import {Transaction, TransactionDashboard} from "../../model/transaction.model";
import {NgForOf} from "@angular/common";
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";
import {
  TransactionButtonsComponent
} from "../../shared/components/transactions/transcation-buttons/transaction-buttons.component";
import {
  TransactionItemComponent
} from "../../shared/components/transactions/transaction-item/transaction-item.component";
import {AddTransactionComponent} from "../../shared/components/transactions/add-transaction/add-transaction.component";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    TransactionItemComponent,
    NgForOf,
    NavigationComponent,
    TransactionButtonsComponent,
    AddTransactionComponent
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  public transactions: TransactionDashboard[] = [
    {id: 1, categoryName: 'Salary', type: 'EARNING', amount: 300, date: new Date(), accountName: 'cash'},
    {id: 1, categoryName: 'Salary', type: 'SPENDING', amount: 300, date: new Date(), accountName: 'cash'},
    {id: 1, categoryName: 'Salary', type: 'SPENDING', amount: 300, date: new Date(), accountName: 'cash'},
    {id: 1, categoryName: 'Salary', type: 'EARNING', amount: 300, date: new Date(), accountName: 'cash'},
    {id: 1, categoryName: 'Salary', type: 'SPENDING', amount: 300, date: new Date(), accountName: 'cash'},
    {id: 1, categoryName: 'Salary', type: 'SPENDING', amount: 300, date: new Date(), accountName: 'cash'},
    {id: 1, categoryName: 'Salary', type: 'EARNING', amount: 300, date: new Date(), accountName: 'cash'},
    {id: 1, categoryName: 'Salary', type: 'SPENDING', amount: 300, date: new Date(), accountName: 'cash'},
  ]
}
