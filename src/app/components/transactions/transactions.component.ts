import {Component, inject, Input, OnInit, viewChild} from '@angular/core';
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
  private navigationComponent = viewChild.required<NavigationComponent>('navigation')
  public transactionService: TransactionService = inject(TransactionService);
  @Input() public navigationConfig!: NavigationConfig;
  public transactions: TransactionDashboard[] = []

  ngOnInit() {
    this.loadTransaction();
  }

  public loadTransaction(navigationConfig: NavigationConfig = this.navigationConfig): void {
    this.navigationConfig = navigationConfig;
    this.transactionService.getTransaction(this.navigationConfig).subscribe({
      next: transactions => {
        if (transactions.length > 0) {
          this.transactions = transactions;
        } else if (this.navigationConfig.pageNumber > 0) {
          this.navigationComponent().rollbackPage();
        }
      }
    })
  }

}
