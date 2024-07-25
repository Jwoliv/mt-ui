import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {PeriodReportComponent} from "./period-report/period-report.component";
import {DailyAmountReport, ProfitReport, SummaryResponse} from "../../model/summary.model";
import {DailyReportService} from "../../services/daily-report.service";
import {Colors} from "../../shared/app.colors";
import {DAILY_AMOUNT_STACK_COLORS_CHANGE} from "../../shared/app.constants";
import {map, tap} from "rxjs";
import {getActiveColor, getLightColor} from "../../utils/app.stock-color-changes";
import {StockCalcService} from "../../services/stock-calc.service";
import {ColorChangerService} from "../../services/color-changer.service";

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
  public reportService: DailyReportService = inject(DailyReportService);
  public summaryStockCalcService: StockCalcService = inject(StockCalcService);
  public colorChanger: ColorChangerService = inject(ColorChangerService);
  public destroyRef: DestroyRef = inject(DestroyRef);

  public response: SummaryResponse = { dailyReports: [], profitReports: [] };
  public selectedStock!: DailyAmountReport | null

  ngOnInit(): void {
    const dailyReportsSub = this.reportService.getDailyAmountReports().pipe(
      map(reports => this.reportService.updatedReportsColor(reports)),
      tap(reports => this.response.dailyReports = reports)
    ).subscribe();

    const profitReportsSub = this.reportService.getProfitReports().pipe(
      map(reports => reports.reverse().map(report => this.reportService.updateProfitReport(report))),
      tap(transformedReports => this.response.profitReports = transformedReports)
    ).subscribe();

    this.destroyRef.onDestroy(() => {
      dailyReportsSub.unsubscribe();
      profitReportsSub.unsubscribe();
    })
  }

}
