import { Component } from '@angular/core';
import {DatePipe, NgForOf, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-transactions-block',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    DatePipe,
    NgStyle
  ],
  templateUrl: './transactions-block.component.html',
  styleUrl: './transactions-block.component.scss'
})
export class TransactionsBlockComponent {
  public transactions: any[] = [
    {
      id: 1,
      category: 'Salary',
      type: 'EARNING',
      amount: 300,
      date: new Date(),
      account:  { id: 1, name: 'cash' },
    },
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
    }
  ]
}
