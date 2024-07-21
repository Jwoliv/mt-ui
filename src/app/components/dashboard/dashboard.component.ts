import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {DailyStockComponent} from "./daily-stock/daily-stock.component";
import {TransactionsBlockComponent} from "./transactions-block/transactions-block.component";
import {AccountsBlockComponent} from "./accounts-block/accounts-block.component";
import {DailyReportService} from "../../services/daily-report.service";
import {DailyReport} from "../../model/report.model";

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
  public dailyReports: DailyReport[] = []

  ngOnInit() {
    this.dailyReportService.getDailyReports().subscribe({
      next: data => this.dailyReports = data
    })
  }

}
