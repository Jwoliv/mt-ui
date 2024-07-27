import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DailyReport} from "../../../model/report.model";
import {TransactionDashboard} from "../../../model/transaction.model";
import {Account} from "../../../model/account.model";
import {AuthService} from "../auth/auth.service";
import {HttpConfigService} from "../../../utils/http-config.service";

export interface DashboardResponse {
  reports: DailyReport[];
  transactions: TransactionDashboard[];
  accounts: Account[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  public getDashboardResponse() {
    return this.httpClient.get<DashboardResponse>(HttpConfigService.DASHBOARD_PATH, {
      headers: this.authService.baseHeaders
    });
  }
}
