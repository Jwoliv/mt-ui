import { Component, DestroyRef, inject } from '@angular/core';
import { DownloaderReportsService } from '../../services/api/complex/downloader-reports.service';

@Component({
  selector: 'app-download-reports',
  standalone: true,
  imports: [],
  templateUrl: './download-reports.component.html',
  styleUrls: ['./download-reports.component.scss']
})
export class DownloadReportsComponent {
  private downloaderReports: DownloaderReportsService = inject(DownloaderReportsService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  downloadXlsx() {
    const downloadXlsxReportsSub = this.downloaderReports.downloadXlsxReports().subscribe({
      next: (downloadXlsxReports) => this.handleDownload(downloadXlsxReports, 'report.xlsx'),
      error: (err) => console.error('Failed to download XLSX report', err)
    });
    this.destroyRef.onDestroy(() => downloadXlsxReportsSub.unsubscribe());
  }

  downloadCsv() {
    const downloadCsvReportsSub = this.downloaderReports.downloadCsvReports().subscribe({
      next: (downloadCsvReports) => this.handleDownload(downloadCsvReports, 'report.csv'),
      error: (err) => console.error('Failed to download CSV report', err)
    });
    this.destroyRef.onDestroy(() => downloadCsvReportsSub.unsubscribe());
  }

  private handleDownload(data: Blob, filename: string) {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
