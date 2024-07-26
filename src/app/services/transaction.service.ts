import {inject, Injectable} from '@angular/core';
import {NewTransactionRequest, TransactionDashboard} from "../model/transaction.model";
import {HttpClient} from "@angular/common/http";
import {getBasePathUrl} from "./config/properties.config";
import {NavigationConfig} from "../model/navigation.model";
import {Observable} from "rxjs";
import {AuthService} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  public createNewTransaction(newTransaction: NewTransactionRequest) {
    return this.httpClient.post<TransactionDashboard>(`${getBasePathUrl()}/transaction/new`, newTransaction, {
      headers: this.authService.baseHeaders
    })
  }

  public getTransactionForDashboard() {
    return this.httpClient.get<TransactionDashboard[]>(`${getBasePathUrl()}/transaction/dashboard`, {
      headers: this.authService.baseHeaders
    })
  }

  public getTransaction(navigationConfig: NavigationConfig): Observable<TransactionDashboard[]> {
    return this.httpClient.get<TransactionDashboard[]>(`${getBasePathUrl()}/transaction`, {
      headers: this.authService.baseHeaders, params: {
        pageNumber: navigationConfig.pageNumber,
        pageSize: navigationConfig.pageSize
      }
    })
  }

}
