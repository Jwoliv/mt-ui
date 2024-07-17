import {Injectable, Signal} from '@angular/core';
import {Stock} from "../model/stock.model";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly MAX_HEIGHT_STOCK: number = 220; // todo: fix service


  public getEarningHeight(stock: Signal<Stock>, total: number): string {
    return this.calculateHeight(stock().spending, total);
  }

  public getSpendingHeight(stock: Signal<Stock>, total: number): string {
    return this.calculateHeight(stock().earning, total);
  }


  private calculateHeight(total: number, value: number) {
    let percentage = this.calculatePercentage(total, value)
    return `${(this.MAX_HEIGHT_STOCK * percentage) / 100}px`
  }

  private calculatePercentage(total: number, value: number) {
    let percentage: number = total > 0 ? (value / total) * 100 : 0;
    return percentage < 20 ? 20 : percentage;
  }
}
