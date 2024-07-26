import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DailyReport} from "../../model/report.model";
import {TransactionDashboard} from "../../model/transaction.model";
import {Account} from "../../model/account.model";
import {getBasePathUrl2} from "../config/properties.config";
import {AuthService} from "../auth/auth.service";

export interface DashboardResponse {
  reports: DailyReport[] | undefined;
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
    return this.httpClient.get<DashboardResponse>(`${getBasePathUrl2()}/dashboard`, {headers: this.authService.baseHeaders});
  }
}
