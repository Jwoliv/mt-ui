import {Component, Input} from '@angular/core';
import {CurrencyPipe, PercentPipe, UpperCasePipe} from "@angular/common";
import {ProfitPipe} from "../../../pipe/profit.pipe";
import {Report} from "../../../model/summary.model";

@Component({
  selector: 'app-period-report',
  standalone: true,
  imports: [
    CurrencyPipe,
    PercentPipe,
    ProfitPipe,
    UpperCasePipe
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
