import {Component, Input} from '@angular/core';
import {Report} from "../summary.component";
import {CurrencyPipe, PercentPipe} from "@angular/common";
import {ProfitPipe} from "../../../pipe/profit.pipe";

@Component({
  selector: 'app-period-report',
  standalone: true,
  imports: [
    CurrencyPipe,
    PercentPipe,
    ProfitPipe
  ],
  templateUrl: './period-report.component.html',
  styleUrl: './period-report.component.scss'
})
export class PeriodReportComponent {
  @Input() report!: Report

  getColor(isProfit: boolean) {
    return isProfit ? '#76FF94' : '#FF7676';
  }
}
