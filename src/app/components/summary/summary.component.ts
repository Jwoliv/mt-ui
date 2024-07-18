import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {PeriodReportComponent} from "./period-report/period-report.component";
import {SummaryDailyStock, SummaryData} from "../../model/summary.model";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    NgForOf,
    PeriodReportComponent,
    DatePipe,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {

  public summaryData: SummaryData = {
    summaryDailyStocks: this.generateSummaryDailyStocks(),
    reports: [
      {amount: 2000, percentage: 1, type: 'DAY', isProfit: true},
      {amount: 2000, percentage: 0.5, type: 'WEEK', isProfit: false},
      {amount: 2000, percentage: 0.64, type: 'MONTH', isProfit: false},
      {amount: 2000, percentage: 1, type: 'YEAR', isProfit: true}
    ]
  };
  public selectedStock!: SummaryDailyStock | null

  get maxDailyAmount(): number {
    return Math.max(...this.summaryData.summaryDailyStocks.map(stock => stock.dailyAmount));
  }

  getHeight(dailyAmount: number): string {
    const maxHeight = 480;
    const scaleFactor = maxHeight / this.maxDailyAmount;
    const value = Math.floor(scaleFactor * dailyAmount);
    return `${value > 1 ? value : 1}px`;
  }

  ngOnInit(): void {
    const summaryDailyStocks = this.summaryData.summaryDailyStocks;
    for (let i = 0; i < summaryDailyStocks.length; i++) {
      if (i === 0 || summaryDailyStocks[i].dailyAmount > summaryDailyStocks[i - 1].dailyAmount) {
        summaryDailyStocks[i].color = '#76FF94';
      } else {
        summaryDailyStocks[i].color = '#FF7676';
      }
    }
    this.summaryData.summaryDailyStocks = summaryDailyStocks;
  }

  private generateSummaryDailyStocks() { // todo: remove when connect backend
    const values: SummaryDailyStock[] = [];
    for (let i = 0; i < 60; i++) {
      values.push({
        index: i, dailyAmount: Math.floor((Math.random() * 10000) + 1000), date: new Date()
      })
    }
    return values;
  }

  changeSelectedData(sds: SummaryDailyStock) {
    this.resetSelectedStock();
    if (sds.index === this.selectedStock?.index) {
      this.selectedStock = null;
      return;
    }
    if (!this.selectedStock || sds.index !== this.selectedStock.index) {
      this.selectedStock = sds;
      if (this.selectedStock.color === '#76FF94') {
        this.selectedStock.color = '#00861c';
      }
      if (this.selectedStock.color === '#FF7676') {
        this.selectedStock.color = '#9A0000'
      }
    }
  }

  resetSelectedStock() {
    if (this.selectedStock) {
      if (this.selectedStock.color === '#00861c') this.selectedStock.color = '#76FF94';
      if (this.selectedStock.color === '#9A0000') this.selectedStock.color = '#FF7676';
    }
  }
}
