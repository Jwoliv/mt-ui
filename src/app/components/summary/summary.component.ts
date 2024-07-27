import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {PeriodReportComponent} from "./period-report/period-report.component";
import {DailyAmountReport, SummaryResponse} from "../../model/api-model/summary.model";
import {DailyReportService} from "../../utils/daily-report.service";
import {map, tap} from "rxjs";
import {ColorChangerService} from "../../utils/color-changer.service";
import {SummaryService} from "../../services/api/complex/summary.service";
import {StockService} from "../../utils/stock.service";

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
  private summaryService: SummaryService = inject(SummaryService);
  private reportService: DailyReportService = inject(DailyReportService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public stockService: StockService = inject(StockService);
  public colorChangerService: ColorChangerService = inject(ColorChangerService);

  public response: SummaryResponse = { dailyReports: [], profitReports: [] };
  public selectedStock!: DailyAmountReport | null

  ngOnInit(): void {
    const summaryResponseSub = this.summaryService.getSummaryResponse().pipe(
      map(reports => this.reportService.updatedReportsColor(reports)),
      tap(reports => this.updateEmptyProfit(reports)),
      tap(reports => this.response.dailyReports = reports.dailyReports)
    ).subscribe({
      next: value => this.response = value
    });

    this.destroyRef.onDestroy(() => {
      summaryResponseSub.unsubscribe();
    });
  }


  private updateEmptyProfit(reports: SummaryResponse) {
    reports.profitReports
      .forEach(r => {
        if (!r.profit) {
          r.profit = 0
        }
        r.isProfit = r.profit >= 0
        r.percentage = r.percentage / 100
      });
  }
}
