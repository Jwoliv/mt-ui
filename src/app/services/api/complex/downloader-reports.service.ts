import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpConfigService} from "../../../utils/http-config.service";
import {JwtTokenService} from "../../../utils/jwt-token.service";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DownloaderReportsService {
  public httpClient: HttpClient = inject(HttpClient);
  public authService: AuthService = inject(AuthService);

  public downloadXlsxReports() {
    return this.httpClient.get(`${HttpConfigService.DOWNLOAD_REPORTS_PATH}/xlsx`, {
      headers: this.authService.baseHeaders
    });
  }

  public downloadCsvReports() {
    return this.httpClient.get(`${HttpConfigService.DOWNLOAD_REPORTS_PATH}/csv`, {
      headers: this.authService.baseHeaders
    });
  }
}
