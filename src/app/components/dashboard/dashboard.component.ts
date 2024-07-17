import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {DailyStockComponent} from "./daily-stock/daily-stock.component";
import {Stock} from "../../model/stock.model";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    DailyStockComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public data: Stock[] = [
    { earning: 1000,  spending: 20,  date: new Date() },
    { earning: 90,  spending: 20, date: new Date() },
    { earning: 80,  spending: 30, date: new Date()},
    { earning: 70, spending: 40, date: new Date()},
    { earning: 1000,  spending: 20,  date: new Date() },
    { earning: 90,  spending: 20, date: new Date() },
    { earning: 80,  spending: 30000, date: new Date()},
    { earning: 70, spending: 405, date: new Date()},
    { earning: 1000,  spending: 20,  date: new Date() },
    { earning: 90,  spending: 20, date: new Date() },
    { earning: 805,  spending: 30, date: new Date()},
    { earning: 70, spending: 40, date: new Date()},
    { earning: 100,  spending: 20,  date: new Date() },
    { earning: 902,  spending: 206, date: new Date() },
    { earning: 100,  spending: 30, date: new Date()},
    { earning: 70, spending: 40, date: new Date()},
    { earning: 160,  spending: 20,  date: new Date() },
    { earning: 100,  spending: 203, date: new Date() },
    { earning: 400,  spending: 30, date: new Date()},
    { earning: 60, spending: 40, date: new Date()},
    { earning: 10,  spending: 20,  date: new Date() },
    { earning: 90,  spending: 20, date: new Date() },
    { earning: 80,  spending: 305, date: new Date()},
    { earning: 70, spending: 460, date: new Date()},
  ]
}
