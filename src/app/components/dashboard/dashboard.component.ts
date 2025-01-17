import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {DailyStockComponent} from "./daily-stock/daily-stock.component";
import {TransactionsBlockComponent} from "./transactions-block/transactions-block.component";
import {AccountsBlockComponent} from "./accounts-block/accounts-block.component";
import {DailyReportService} from "../../utils/daily-report.service";
import {TransactionDashboard} from "../../model/api-model/transaction.model";
import {DashboardResponse, DashboardService} from "../../services/api/complex/dashboard.service";
import {DailyReport} from "../../model/api-model/report.model";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    DailyStockComponent,
    TransactionsBlockComponent,
    AccountsBlockComponent,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private dailyReportService: DailyReportService = inject(DailyReportService);
  private dashboardService: DashboardService = inject(DashboardService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public response!: DashboardResponse

  ngOnInit() {
    const dashboardResponseSub = this.dashboardService.getDashboardResponse().subscribe({
      next: response => this.response = response
    })
    this.destroyRef.onDestroy(() => dashboardResponseSub.unsubscribe());
  }

  public updateDailyStockReports(transaction: TransactionDashboard) {
    const transactionDate = new Date(transaction.date);
    const reportIndex = this.response.reports?.findIndex(dr =>
      this.dailyReportService.isTheSameDateInReport(new Date(dr.date), transactionDate)
    );
    this.dailyReportService.changeDailyReportsAmount(transaction, this.response.reports as DailyReport[], reportIndex as number);
  }
}
