import {inject, Injectable, WritableSignal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtTokenService} from "./auth/jwt-token.service";
import {DailyReport} from "../model/report.model";
import {getBasePathUrl} from "./config/properties.config";
import {DailyAmountReport} from "../model/summary.model";
import {TransactionDashboard} from "../model/transaction.model";

@Injectable({
  providedIn: 'root'
})
export class DailyReportService {
  private httpClient: HttpClient = inject(HttpClient);
  private jwtTokenService: JwtTokenService = inject(JwtTokenService);


  public getDailyReports() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtTokenService.jwtToken}`);
    return this.httpClient.get<DailyReport[]>(`${getBasePathUrl()}/reports/daily-dashboard`, {
      headers
    })
  }

  public getDailyAmountReports() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtTokenService.jwtToken}`);
    return this.httpClient.get<DailyAmountReport[]>(`${getBasePathUrl()}/reports/daily-amount-reports`, {
      headers
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
        console.log('Transfer reports don\'t change daily stock report');
        break;
      default:
        console.log('Unknown transaction type');
        break;
    }
  }

  public isTheSameDateInReport(reportDate: Date, transactionDate: Date) {
    return (
      reportDate.getDate() === transactionDate.getDate() &&
      reportDate.getMonth() === transactionDate.getMonth() &&
      reportDate.getFullYear() === transactionDate.getFullYear()
    );
  }
}
