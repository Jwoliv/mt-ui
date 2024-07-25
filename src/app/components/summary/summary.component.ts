import {Component, inject, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {PeriodReportComponent} from "./period-report/period-report.component";
import {DailyAmountReport, SummaryData} from "../../model/summary.model";
import {DailyReportService} from "../../services/daily-report.service";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    NgForOf,
    PeriodReportComponent,
    DatePipe,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
  public reportService: DailyReportService = inject(DailyReportService);

  public summaryData: SummaryData = {
    dailyAmountReports: [],
    reports: []
  };
  public selectedStock!: DailyAmountReport | null

  get maxDailyAmount(): number {
    return Math.max(...this.summaryData.dailyAmountReports.map(stock => stock.amount));
  }

  getHeight(dailyAmount: number): string {
    const maxHeight = 480;
    const scaleFactor = maxHeight / this.maxDailyAmount;
    const value = Math.floor(scaleFactor * dailyAmount);
    return `${value > 1 ? value : 1}px`;
  }

  ngOnInit(): void {
    this.reportService.getDailyAmountReports().subscribe({
      next: reports => {
        this.summaryData.dailyAmountReports = reports;
        for (let i = 0; i < this.summaryData.dailyAmountReports.length; i++) {
          if (i === 0 || this.summaryData.dailyAmountReports[i].amount > this.summaryData.dailyAmountReports[i - 1].amount) {
            this.summaryData.dailyAmountReports[i].color = '#76FF94';
          } else if (this.summaryData.dailyAmountReports[i].amount === this.summaryData.dailyAmountReports[i - 1].amount) {
            this.summaryData.dailyAmountReports[i].color = '#5bc2e8';
          } else {
            this.summaryData.dailyAmountReports[i].color = '#FF7676';
          }
        }
      }
    });
    this.reportService.getProfitReports().subscribe({
      next: reports => {
        this.summaryData.reports = reports.reverse().map(report => ({
          ...report,
          isProfit: report.profit > 0,
          percentage: report.percentage / 100
        }));
      }
    })
  }


  changeSelectedData(sds: DailyAmountReport) {
    this.resetSelectedStock();
    if (sds.index === this.selectedStock?.index) {
      this.selectedStock = null;
      return;
    }
    if (!this.selectedStock || sds.index !== this.selectedStock.index) {
      this.selectedStock = sds;
      if (this.selectedStock.color === '#76FF94') {
        this.selectedStock.color = '#00861c';
      }
      if (this.selectedStock.color === '#FF7676') {
        this.selectedStock.color = '#9A0000'
      }
      if (this.selectedStock.color === '#5bc2e8') {
        this.selectedStock.color = '#1c5f7c'
      }
    }
  }

  resetSelectedStock() {
    if (this.selectedStock) {
      if (this.selectedStock.color === '#00861c') this.selectedStock.color = '#76FF94';
      if (this.selectedStock.color === '#9A0000') this.selectedStock.color = '#FF7676';
      if (this.selectedStock.color === '#1c5f7c') this.selectedStock.color = '#5bc2e8';
    }
  }
}
