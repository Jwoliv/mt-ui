import {Injectable} from '@angular/core';
import {DailyReport} from "../model/report.model";
import {DailyAmountReport} from "../model/summary.model";
import {TransactionDashboard} from "../model/transaction.model";
import {Colors} from "../shared/app.colors";

@Injectable({
  providedIn: 'root'
})
export class DailyReportService {

  public changeDailyReportsAmount(transaction: TransactionDashboard, dailyReports: DailyReport[], reportIndex: number) {
    if (reportIndex < 0) return;
    switch (transaction.type) {
      case "SPENDING":
        dailyReports[reportIndex].spending += transaction.amount;
        break;
      case "EARNING":
        dailyReports[reportIndex].earning += transaction.amount;
        break;
      case "TRANSFER":
        break;
      default:
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
