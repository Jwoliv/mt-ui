import {Component, Input} from '@angular/core';
import {CurrencyPipe, DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Transaction, TransactionDashboard} from "../../../../model/api-model/transaction.model";

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss'
})
export class TransactionItemComponent {
  @Input() transaction!: TransactionDashboard
}
