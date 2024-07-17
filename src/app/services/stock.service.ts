import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly MAX_HEIGHT_STOCK: number = 220;

  public calculateHeight(total: number, value: number) {
    let percentage = this.calculatePercentage(total, value)
    return `${(this.MAX_HEIGHT_STOCK * percentage) / 100}px`
  }

  private calculatePercentage(total: number, value: number) {
    let percentage: number = total > 0 ? (value / total) * 100 : 0;
    return percentage < 20 ? 20 : percentage;
  }
}
