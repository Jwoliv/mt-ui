import {Component, Input} from '@angular/core';
import {CurrencyPipe, PercentPipe, UpperCasePipe} from "@angular/common";
import {ProfitPipe} from "../../../pipe/profit.pipe";
import {ProfitReport} from "../../../model/summary.model";
import {Colors} from "../../../shared/app.colors";

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
  @Input() report!: ProfitReport

  public getColor(isProfit: boolean) {
    return isProfit ? Colors.LIGHT_GREEN : Colors.LIGHT_RED;
  }
}
