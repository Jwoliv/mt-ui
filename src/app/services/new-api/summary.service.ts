import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {getBasePathUrl2} from "../config/properties.config";
import {SummaryResponse} from "../../model/summary.model";

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  public getSummaryResponse() {
    return this.httpClient.get<SummaryResponse>(`${getBasePathUrl2()}/summary`, {
      headers: this.authService.baseHeaders
    });
  }
}
