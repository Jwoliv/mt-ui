import {inject, Injectable} from '@angular/core';
import {NewTransactionRequest, TransactionDashboard, TransactionDto} from "../../../model/api-model/transaction.model";
import {HttpClient} from "@angular/common/http";
import {NavigationConfig} from "../../../model/component-model/navigation.model";
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

  public getTransaction(navigationConfig: NavigationConfig) {
    return this.httpClient.get<TransactionDashboard[]>(HttpConfigService.TRANSACTION_PATH, {
      headers: this.authService.baseHeaders, params: {
        pageNumber: navigationConfig.pageNumber,
        pageSize: navigationConfig.pageSize
      }
    })
  }

  public getUserTransactionById(id: number) {
    return this.httpClient.get<TransactionDto>(`${HttpConfigService.TRANSACTION_PATH}/${id}`, {
      headers: this.authService.baseHeaders
    })
  }

  public deleteTransaction(id: number) {
    return this.httpClient.delete<TransactionDashboard>(`${HttpConfigService.TRANSACTION_PATH}/${id}`, {
      headers: this.authService.baseHeaders
    })
  }
}
