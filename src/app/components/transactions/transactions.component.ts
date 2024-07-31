import {Component, inject, OnInit} from '@angular/core';
import {PageTransactionResponse, TransactionDashboard} from "../../model/api-model/transaction.model";
import {NgForOf} from "@angular/common";
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";
import {
  TransactionButtonsComponent
} from "../../shared/components/transactions/transcation-buttons/transaction-buttons.component";
import {
  TransactionItemComponent
} from "../../shared/components/transactions/transaction-item/transaction-item.component";
import {AddTransactionComponent} from "../../shared/components/transactions/add-transaction/add-transaction.component";
import {TransactionService} from "../../services/api/entities/transaction.service";
import {NavigationConfig} from "../../model/component-model/navigation.model";
import {
  ListNavTransactionsComponent
} from "../../shared/components/list-nav-transactions/list-nav-transactions.component";
import {HttpConfigService} from "../../utils/http-config.service";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    TransactionItemComponent,
    NgForOf,
    NavigationComponent,
    TransactionButtonsComponent,
    AddTransactionComponent,
    ListNavTransactionsComponent
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public navigationConfig: NavigationConfig = {
    pageNumber: HttpConfigService.DEFAULT_PAGE_NUMBER, pageSize: HttpConfigService.DEFAULT_PAGE_SIZE
  };

  public transactionService = inject(TransactionService);
  public response: PageTransactionResponse = { elements: [], isNextPage: false, isPrevPage: false }

  ngOnInit() {
    this.loadTransaction();
  }

  public loadTransaction(navigationConfig: NavigationConfig = this.navigationConfig): void {
    this.navigationConfig = navigationConfig;
    this.transactionService.getTransactionPageable(this.navigationConfig).subscribe({
      next: response => {
        console.log(response)
        this.response = response
      }
    })
  }

  public updateTransactions(transaction: TransactionDashboard) {
    this.response.elements.unshift(transaction)
  }
}
