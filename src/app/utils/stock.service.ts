import {Injectable} from '@angular/core';
import {SummaryResponse} from "../model/api-model/summary.model";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly MAX_HEIGHT_DASHBOARD_STOCK: number = 220;
  private readonly MAX_HEIGHT_SUMMARY_STOCK = 480;

  public getDashboardStockHeight(total: number, value: number): string {
    let percentage = total > 0 ? (value / total) * 100 : 0
    return this.convertToPx((this.MAX_HEIGHT_DASHBOARD_STOCK * percentage) / 100)
  }

  public getSummaryStockHeight(dailyAmount: number, summaryData: SummaryResponse): string {
    const scaleFactor = this.MAX_HEIGHT_SUMMARY_STOCK / this.maxDailyAmount(summaryData);
    const value = Math.floor(scaleFactor * dailyAmount);
    return this.convertToPx(value > 1 ? value : 1);
  }

  private maxDailyAmount(summaryData: SummaryResponse): number {
    return Math.max(...summaryData.dailyReports.map(stock => stock.amount));
  }

  private convertToPx(value: number) {
    return `${value}px`;
  }
}
