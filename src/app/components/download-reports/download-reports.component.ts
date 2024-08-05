import {Component, DestroyRef, inject} from '@angular/core';
import {DownloaderReportsService} from "../../services/api/complex/downloader-reports.service";

@Component({
  selector: 'app-download-reports',
  standalone: true,
  imports: [],
  templateUrl: './download-reports.component.html',
  styleUrl: './download-reports.component.scss'
})
export class DownloadReportsComponent {
  private downloaderReports: DownloaderReportsService = inject(DownloaderReportsService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  downloadXlsx() {
    const downloadXlsxReportsSub = this.downloaderReports.downloadXlsxReports().subscribe();
    this.destroyRef.onDestroy(() => downloadXlsxReportsSub.unsubscribe());
  }

  downloadCsv() {
    const downloadXlsxReportsSub = this.downloaderReports.downloadCsvReports().subscribe();
    this.destroyRef.onDestroy(() => downloadXlsxReportsSub.unsubscribe());
  }
}
