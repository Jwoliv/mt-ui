import {inject, Injectable} from '@angular/core';
import {NewTransactionRequest, TransactionDashboard} from "../../../model/transaction.model";
import {HttpClient} from "@angular/common/http";
import {NavigationConfig} from "../../../model/navigation.model";
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {HttpConfigService} from "../../../utils/http-config.service";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  public createNewTransaction(newTransaction: NewTransactionRequest) {
    return this.httpClient.post<TransactionDashboard>(`${HttpConfigService.TRANSACTION_PATH}/new`, newTransaction, {
      headers: this.authService.baseHeaders
    })
  }

  public getTransaction(navigationConfig: NavigationConfig): Observable<TransactionDashboard[]> {
    return this.httpClient.get<TransactionDashboard[]>(HttpConfigService.TRANSACTION_PATH, {
      headers: this.authService.baseHeaders, params: {
        pageNumber: navigationConfig.pageNumber,
        pageSize: navigationConfig.pageSize
      }
    })
  }

}
