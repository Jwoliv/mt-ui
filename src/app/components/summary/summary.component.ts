import {Component, inject, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {PeriodReportComponent} from "./period-report/period-report.component";
import {DailyAmountReport, SummaryData} from "../../model/summary.model";
import {DailyReportService} from "../../services/daily-report.service";
import {Colors} from "../../shared/app.colors";
import {DAILY_AMOUNT_STACK_COLORS_CHANGE} from "../../shared/app.constants";

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

  public getHeight(dailyAmount: number): string {
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
            this.summaryData.dailyAmountReports[i].color = Colors.LIGHT_GREEN;
          } else if (this.summaryData.dailyAmountReports[i].amount === this.summaryData.dailyAmountReports[i - 1].amount) {
            this.summaryData.dailyAmountReports[i].color = Colors.LIGHT_BLUE;
          } else {
            this.summaryData.dailyAmountReports[i].color = Colors.LIGHT_RED;
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


  public changeSelectedData(sds: DailyAmountReport) {
    if (sds.index === this.selectedStock?.index) {
      this.resetSelectedStock();
      this.selectedStock = null;
      return;
    }

    this.resetSelectedStock();
    if (sds.index !== this.selectedStock?.index) {
      this.selectedStock = sds;
      this.selectedStock.color = this.getActiveColor(this.selectedStock.color as Colors);
    }
  }

  public resetSelectedStock() {
    if (this.selectedStock) {
      this.selectedStock.color = this.getLightColor(this.selectedStock.color as Colors);
    }
  }

  private getActiveColor(color: Colors): Colors {
    return DAILY_AMOUNT_STACK_COLORS_CHANGE.get(color) ?? color;
  }

  private getLightColor(color: Colors): Colors {
    return DAILY_AMOUNT_STACK_COLORS_CHANGE.get(color) ?? color;
  }

}
