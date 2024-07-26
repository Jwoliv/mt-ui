import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {NgForOf} from "@angular/common";
import {DailyStockComponent} from "./daily-stock/daily-stock.component";
import {TransactionsBlockComponent} from "./transactions-block/transactions-block.component";
import {AccountsBlockComponent} from "./accounts-block/accounts-block.component";
import {DailyReportService} from "../../services/daily-report.service";
import {DailyReport} from "../../model/report.model";
import {TransactionDashboard} from "../../model/transaction.model";
import {TransactionService} from "../../services/transaction.service";
import {Account} from "../../model/account.model";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    DailyStockComponent,
    TransactionsBlockComponent,
    AccountsBlockComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private dailyReportService: DailyReportService = inject(DailyReportService);
  private transactionService: TransactionService = inject(TransactionService);
  private accountService: AccountService = inject(AccountService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public dailyReports = signal<DailyReport[]>([])
  public transactions = signal<TransactionDashboard[]>([]);
  public accounts = signal<Account[]>([]);

  ngOnInit() {
    const dailyReportsSub = this.dailyReportService.getDailyReports().subscribe({
      next: reports => this.dailyReports.set(reports)
    })
    const transactionSub = this.transactionService.getTransactionForDashboard().subscribe({
      next: (transactions: TransactionDashboard[]) => this.transactions.set(transactions)
    })
    const accountSub = this.accountService.dashboardAccounts$.subscribe({
      next: (accounts: Account[]) => this.accounts.set(accounts.slice(0, 3))
    });

    this.destroyRef.onDestroy(() => {
      dailyReportsSub.unsubscribe()
      transactionSub.unsubscribe()
      accountSub.unsubscribe()
    });
  }

  public updateDailyStockReports(transaction: TransactionDashboard) {
    const transactionDate = new Date(transaction.date);
    const reportIndex = this.dailyReports().findIndex(dr =>
      this.dailyReportService.isTheSameDateInReport(new Date(dr.date), transactionDate)
    );
    this.dailyReportService.changeDailyReportsAmount(transaction, this.dailyReports, reportIndex);
  }
}
