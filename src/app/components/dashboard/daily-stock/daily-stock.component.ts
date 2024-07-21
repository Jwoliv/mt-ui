import {Component, inject, Input, signal} from '@angular/core';
import {Stock} from "../../../model/stock.model";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {StockService} from "../../../services/stock.service";

@Component({
  selector: 'app-daily-stock',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe
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

  public getEarningHeight(): string {
    return this.stockService.calculateHeight(this.total, this._stock().earning);
  }

  public getSpendingHeight(): string {
    return this.stockService.calculateHeight(this.total, this._stock().spending);
  }
}
