import {Component, computed, Input, OnInit, signal} from '@angular/core';
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
  public _stock = signal<Stock>({ earning: 0, spending: 0, date: new Date() });
  public isActiveStock = signal<boolean>(false);


  @Input({ required: true }) set stock(_stock: Stock) {
    this._stock.set(_stock);
  }

  public getEarningHeight(): string {
    const total = this._stock().earning + this._stock().spending;
    const percentage = total > 0 ? (this._stock().earning / total) * 100 : 0;
    return `${(220 * percentage) / 100}px`
  }

  public getSpendingHeight(): string {
    const total = this._stock().earning + this._stock().spending;
    const percentage = total > 0 ? (this._stock().spending / total) * 100 : 0;
    return `${(220 * percentage) / 100}px`
  }

  public onClickStockItem = () => this.isActiveStock.set(!this.isActiveStock());
}
