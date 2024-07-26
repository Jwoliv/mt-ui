import {inject, Injectable, WritableSignal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtTokenService} from "./auth/jwt-token.service";
import {DailyReport} from "../model/report.model";
import {getBasePathUrl} from "./config/properties.config";
import {DailyAmountReport, ProfitReport} from "../model/summary.model";
import {TransactionDashboard} from "../model/transaction.model";
import {Colors} from "../shared/app.colors";
import {AuthService} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DailyReportService {
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);


  public getDailyReports() {
    return this.httpClient.get<DailyReport[]>(`${getBasePathUrl()}/reports/daily-dashboard`, {
      headers: this.authService.baseHeaders
    })
  }

  public getDailyAmountReports() {
    return this.httpClient.get<DailyAmountReport[]>(`${getBasePathUrl()}/reports/daily-amount-reports`, {
      headers: this.authService.baseHeaders
    })
  }

  public getProfitReports() {
    return this.httpClient.get<ProfitReport[]>(`${getBasePathUrl()}/reports/profits-reports`, {
      headers: this.authService.baseHeaders
    })
  }

  public changeDailyReportsAmount(transaction: TransactionDashboard, dailyReports: WritableSignal<DailyReport[]>, reportIndex: number) {
    if (reportIndex < 0) return;
    switch (transaction.type) {
      case "SPENDING":
        dailyReports()[reportIndex].spending += transaction.amount;
        break;
      case "EARNING":
        dailyReports()[reportIndex].earning += transaction.amount;
        break;
      case "TRANSFER":
        break;
      default:
        break;
    }
  }

  public updateProfitReport(report: ProfitReport): ProfitReport {
    return {
      ...report, isProfit: report.profit > 0, percentage: report.percentage / 100
    };
  }

  public isTheSameDateInReport(reportDate: Date, transactionDate: Date) {
    return (
      reportDate.getDate() === transactionDate.getDate() &&
      reportDate.getMonth() === transactionDate.getMonth() &&
      reportDate.getFullYear() === transactionDate.getFullYear()
    );
  }

  public updatedReportsColor(reports: DailyAmountReport[]) {
    for (let i = 0; i < reports.length; i++) {
      if (i === 0 || this.isPrevStockHigher(reports, i)) {
        reports[i].color = Colors.LIGHT_GREEN;
      } else {
        reports[i].color = this.neighborhoodStockEqualByAmount(reports, i)
          ? Colors.LIGHT_BLUE
          : Colors.LIGHT_RED;
      }

    }
    return reports;
  }

  private neighborhoodStockEqualByAmount(reports: DailyAmountReport[], i: number) {
    return reports[i].amount === reports[i - 1].amount;
  }

  private isPrevStockHigher(reports: DailyAmountReport[], i: number) {
    return reports[i].amount > reports[i - 1].amount;
  }
}
