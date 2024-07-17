import {Component, inject, Input, signal} from '@angular/core';
import {Stock} from "../../../model/stock.model";
import {DatePipe, NgStyle} from "@angular/common";
import {StockService} from "../../../services/stock.service";

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
  private stockService: StockService = inject(StockService);

  public _stock = signal<Stock>({ earning: 0, spending: 0, date: new Date() });
  public isActiveStock = signal<boolean>(false);

  @Input({ required: true }) set stock(_stock: Stock) {
    this._stock.set(_stock);
  }

  get total() {
    return this._stock().earning + this._stock().spending;
  }

  public onClickStockItem = () => this.isActiveStock.set(!this.isActiveStock());


  public getEarningHeight = (): string => this.stockService.calculateHeight(this.total, this._stock().earning);
  public getSpendingHeight = (): string => this.stockService.calculateHeight(this.total, this._stock().spending);
}
