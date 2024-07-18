import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Transaction} from "../../../model/transaction.model";

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss'
})
export class TransactionItemComponent {
  @Input() transaction!: Transaction
}
