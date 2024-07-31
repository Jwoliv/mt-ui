import {Component, Input} from '@angular/core';
import {AddTransactionComponent} from "../transactions/add-transaction/add-transaction.component";
import {NavigationComponent} from "../navigation/navigation.component";
import {NgForOf} from "@angular/common";
import {TransactionItemComponent} from "../transactions/transaction-item/transaction-item.component";
import {PageTransactionResponse} from "../../../model/api-model/transaction.model";

@Component({
  selector: 'app-list-nav-transactions',
  standalone: true,
    imports: [
        AddTransactionComponent,
        NavigationComponent,
        NgForOf,
        TransactionItemComponent
    ],
  templateUrl: './list-nav-transactions.component.html',
  styleUrl: './list-nav-transactions.component.scss'
})
export class ListNavTransactionsComponent {
  @Input({ required: true }) response!: PageTransactionResponse;
  @Input({ required: true }) loadData!: (nc: any) => any;
  @Input({ required: true }) url!: string

  public loadTransaction($event: any) {
    this.loadData($event)
  }
}
