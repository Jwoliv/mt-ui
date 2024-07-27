import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {SummaryResponse} from "../../../model/api-model/summary.model";
import {HttpConfigService} from "../../../utils/http-config.service";

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  public getSummaryResponse() {
    return this.httpClient.get<SummaryResponse>(HttpConfigService.SUMMARY_PATH, {
      headers: this.authService.baseHeaders
    });
  }
}
