import { Component } from '@angular/core';
import {Transaction} from "../../model/transaction.model";
import {TransactionItemComponent} from "../../shared/components/transaction-item/transaction-item.component";
import {NgForOf} from "@angular/common";
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    TransactionItemComponent,
    NgForOf,
    NavigationComponent
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  public transactions: Transaction[] = [
    {id: 1, category: 'Salary', type: 'EARNING', amount: 300, date: new Date(), account: {id: 1, name: 'cash'}},
    {id: 1, category: 'Salary', type: 'SPENDING', amount: 300, date: new Date(), account: {id: 1, name: 'cash'}},
    {id: 1, category: 'Salary', type: 'SPENDING', amount: 300, date: new Date(), account: {id: 1, name: 'cash'}},
    {id: 1, category: 'Salary', type: 'EARNING', amount: 300, date: new Date(), account: {id: 1, name: 'cash'}},
    {id: 1, category: 'Salary', type: 'SPENDING', amount: 300, date: new Date(), account: {id: 1, name: 'cash'}},
    {id: 1, category: 'Salary', type: 'SPENDING', amount: 300, date: new Date(), account: {id: 1, name: 'cash'}},
    {id: 1, category: 'Salary', type: 'EARNING', amount: 300, date: new Date(), account: {id: 1, name: 'cash'}},
    {id: 1, category: 'Salary', type: 'SPENDING', amount: 300, date: new Date(), account: {id: 1, name: 'cash'}},
  ]
}
