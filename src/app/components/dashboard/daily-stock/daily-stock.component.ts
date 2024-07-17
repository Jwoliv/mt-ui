import {Component, Input, signal} from '@angular/core';
import {Stock} from "../../../model/stock.model";
import {DatePipe, NgStyle} from "@angular/common";

@Component({
  selector: 'app-daily-stock',
  standalone: true,
  imports: [
    DatePipe,
    NgStyle
  ],
  templateUrl: './daily-stock.component.html',
  styleUrl: './daily-stock.component.scss'
})
export class DailyStockComponent {
  private readonly MAX_HEIGHT_STOCK = 220;

  public _stock = signal<Stock>({ earning: 0, spending: 0, date: new Date() });
  public isActiveStock = signal<boolean>(false);

  @Input({ required: true }) set stock(_stock: Stock) {
    this._stock.set(_stock);
  }

  get total() {
    return this._stock().earning + this._stock().spending;
  }

  public getEarningHeight(): string {
    return this.calculateHeight(this._stock().earning);
  }

  public getSpendingHeight(): string {
    return this.calculateHeight(this._stock().spending);
  }

  public onClickStockItem = () => this.isActiveStock.set(!this.isActiveStock());

  private calculateHeight(value: number) {
    let percentage = this.calculatePercentage(value)
    return `${(this.MAX_HEIGHT_STOCK * percentage) / 100}px`
  }

  private calculatePercentage(value: number) {
    let percentage: number = this.total > 0 ? (value / this.total) * 100 : 0;
    return percentage < 20 ? 20 : percentage;
  }

}
