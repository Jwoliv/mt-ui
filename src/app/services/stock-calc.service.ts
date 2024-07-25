import { Injectable } from '@angular/core';
import {SummaryResponse} from "../model/summary.model";

@Injectable({
  providedIn: 'root'
})
export class StockCalcService {

  maxDailyAmount(summaryData: SummaryResponse): number {
    return Math.max(...summaryData.dailyReports.map(stock => stock.amount));
  }

  public getHeight(dailyAmount: number, summaryData: SummaryResponse): string {
    const maxHeight = 480;
    const scaleFactor = maxHeight / this.maxDailyAmount(summaryData);
    const value = Math.floor(scaleFactor * dailyAmount);
    return `${value > 1 ? value : 1}px`;
  }
}
