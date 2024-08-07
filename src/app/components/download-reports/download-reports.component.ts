import { Component, DestroyRef, inject } from '@angular/core';
import { DownloaderReportsService } from '../../services/api/complex/downloader-reports.service';
import {HoverBackgroundColorDirective} from "../../directive/hover-background-color.directive";
import {Colors} from "../../shared/app.colors";

@Component({
  selector: 'app-download-reports',
  standalone: true,
  imports: [
    HoverBackgroundColorDirective
  ],
  templateUrl: './download-reports.component.html',
  styleUrls: ['./download-reports.component.scss']
})
export class DownloadReportsComponent {
  private downloaderReports: DownloaderReportsService = inject(DownloaderReportsService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  downloadXlsx() {
    const downloadXlsxReportsSub = this.downloaderReports.downloadXlsxReports().subscribe({
      next: (downloadXlsxReports) => this.handleDownload(downloadXlsxReports, 'xlsx'),
      error: (err) => console.error('Failed to download XLSX report', err)
    });
    this.destroyRef.onDestroy(() => downloadXlsxReportsSub.unsubscribe());
  }

  downloadCsv() {
    const downloadCsvReportsSub = this.downloaderReports.downloadCsvReports().subscribe({
      next: (downloadCsvReports) => this.handleDownload(downloadCsvReports, 'csv'),
      error: (err) => console.error('Failed to download CSV report', err)
    });
    this.destroyRef.onDestroy(() => downloadCsvReportsSub.unsubscribe());
  }

  private handleDownload(data: Blob, fileExtension: string) {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const formattedTime = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
    const filename = `report-${formattedDate}-${formattedTime}.${fileExtension}`;

    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  protected readonly Colors = Colors;
}
