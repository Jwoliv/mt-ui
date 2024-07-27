import { Injectable } from '@angular/core';
import {SummaryResponse} from "../model/summary.model";

@Injectable({
  providedIn: 'root'
})
export class StockCalcService {

  private static readonly MAX_HEIGHT = 480;

  public getHeight(dailyAmount: number, summaryData: SummaryResponse): string {
    const scaleFactor = StockCalcService.MAX_HEIGHT / this.maxDailyAmount(summaryData);
    const value = Math.floor(scaleFactor * dailyAmount);
    return `${value > 1 ? value : 1}px`;
  }

  private maxDailyAmount(summaryData: SummaryResponse): number {
    return Math.max(...summaryData.dailyReports.map(stock => stock.amount));
  }
}
