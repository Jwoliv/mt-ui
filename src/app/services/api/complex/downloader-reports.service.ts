import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpConfigService } from '../../../utils/http-config.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloaderReportsService {
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  public downloadXlsxReports(): Observable<Blob> {
    return this.httpClient.get<Blob>(`${HttpConfigService.DOWNLOAD_REPORTS_PATH}/xlsx`, {
      headers: this.authService.baseHeaders,
      responseType: 'blob' as 'json'
    });
  }

  public downloadCsvReports(): Observable<Blob> {
    return this.httpClient.get<Blob>(`${HttpConfigService.DOWNLOAD_REPORTS_PATH}/csv`, {
      headers: this.authService.baseHeaders,
      responseType: 'blob' as 'json'
    });
  }
}
