import {Component, inject, Input, OnInit} from '@angular/core';
import {TransactionDashboard} from "../../model/transaction.model";
import {NgForOf} from "@angular/common";
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";
import {
  TransactionButtonsComponent
} from "../../shared/components/transactions/transcation-buttons/transaction-buttons.component";
import {
  TransactionItemComponent
} from "../../shared/components/transactions/transaction-item/transaction-item.component";
import {AddTransactionComponent} from "../../shared/components/transactions/add-transaction/add-transaction.component";
import {TransactionService} from "../../services/transaction.service";
import {ActivatedRouteSnapshot, ResolveFn} from "@angular/router";
import {DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE} from "../../services/config/properties.config";
import {NavigationConfig} from "../../model/navigation.model";

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
export class TransactionsComponent implements OnInit {
  public transactionService: TransactionService = inject(TransactionService);
  @Input() public navigationConfig!: NavigationConfig;
  public transactions: TransactionDashboard[] = []

  ngOnInit() {
    this.transactionService.getTransaction(this.navigationConfig).subscribe({
      next: transactions => this.transactions = transactions
    })
  }

}

export const resolveNavigationConfig: ResolveFn<NavigationConfig> = (activateRoute: ActivatedRouteSnapshot) => {
  const pageNumber = +(activateRoute.queryParamMap.get("pageNumber") ?? DEFAULT_PAGE_NUMBER);
  const pageSize = +(activateRoute.queryParamMap.get("pageSize") ?? DEFAULT_PAGE_SIZE);
  return {
    pageNumber, pageSize
  }
}
