import {Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {Stock} from "../../../model/stock.model";
import {DatePipe, NgStyle} from "@angular/common";
import {StockService} from "../../../services/stock.service";

@Component({
  selector: 'app-daily-stock',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './daily-stock.component.html',
  styleUrl: './daily-stock.component.scss'
})
export class DailyStockComponent {
  public stockService = inject(StockService);
  public _stock = signal<Stock>({ earning: 0, spending: 0, date: new Date() });

  @Input({ required: true }) set stock(_stock: Stock) {
    this._stock.set(_stock);
  }

  get total() {
    return this._stock().earning + this._stock().spending;
  }

  get isActive() {
    return this._stock().isActive ?? false;
  }

  public onClickStockItem = () => {
    this._stock.set({
      earning: this._stock().earning,
      spending: this._stock().spending,
      date: this._stock().date,
      isActive: !this._stock().isActive ?? true
    });
  }


  public getEarningHeight = (): string => this.stockService.calculateHeight(this.total, this._stock().earning);
  public getSpendingHeight = (): string => this.stockService.calculateHeight(this.total, this._stock().spending);
}
