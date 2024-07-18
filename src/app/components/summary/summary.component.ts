import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";

export interface SummaryData {
  summaryDailyStocks: SummaryDailyStock[]
}

export interface SummaryDailyStock {
  dailyAmount: number
  color?: '#FF7676' | '#76FF94'
}

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {

  public summaryData: SummaryData = {
    summaryDailyStocks: [
      { dailyAmount: 100 }, { dailyAmount: 200 },
      { dailyAmount: 150 }, { dailyAmount: 300 },
      { dailyAmount: 6000 }, { dailyAmount: 5000 },
      { dailyAmount: 3000 }, { dailyAmount: 2000 },
      { dailyAmount: 2100 }, { dailyAmount: 6000 },
      { dailyAmount: 9000 }, { dailyAmount: 12000 },
      { dailyAmount: 15600 }, { dailyAmount: 22600 },
      { dailyAmount: 1000 }, { dailyAmount: 2000 },
      { dailyAmount: 1500 }, { dailyAmount: 4500 },
      { dailyAmount: 6000 }, { dailyAmount: 5000 },
      { dailyAmount: 3000 }, { dailyAmount: 2000 },
      { dailyAmount: 2100 }, { dailyAmount: 6000 },
      { dailyAmount: 9000 }, { dailyAmount: 10000 },
      { dailyAmount: 7000 }, { dailyAmount: 7500 },
    ]
  };

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
}
