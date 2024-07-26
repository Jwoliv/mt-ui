import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {PeriodReportComponent} from "./period-report/period-report.component";
import {DailyAmountReport, SummaryResponse} from "../../model/summary.model";
import {DailyReportService} from "../../services/daily-report.service";
import {map, tap} from "rxjs";
import {StockCalcService} from "../../services/stock-calc.service";
import {ColorChangerService} from "../../services/color-changer.service";
import {SummaryService} from "../../services/new-api/summary.service";

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
  public summaryStockCalcService: StockCalcService = inject(StockCalcService);
  public colorChangerService: ColorChangerService = inject(ColorChangerService);
  public summaryService: SummaryService = inject(SummaryService);
  public reportService: DailyReportService = inject(DailyReportService);

  public destroyRef: DestroyRef = inject(DestroyRef);

  public response: SummaryResponse = { dailyReports: [], profitReports: [] };
  public selectedStock!: DailyAmountReport | null

  ngOnInit(): void {
    const summaryResponseSub = this.summaryService.getSummaryResponse().pipe(
      map(reports => {
        this.reportService.updatedReportsColor(reports.dailyReports);
        return reports;
      }),
      tap(reports => this.response.dailyReports = reports.dailyReports)
    ).subscribe({
      next: value => {
        this.response = value;
      }
    });

    this.destroyRef.onDestroy(() => {
      summaryResponseSub.unsubscribe();
    });
  }

}
