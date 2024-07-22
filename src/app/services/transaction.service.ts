import {inject, Injectable} from '@angular/core';
import {NewTransactionRequest, TransactionDashboard} from "../model/transaction.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtTokenService} from "./auth/jwt-token.service";
import {getBasePathUrl} from "./config/properties.config";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private httpClient: HttpClient = inject(HttpClient);
  private jwtTokenService: JwtTokenService = inject(JwtTokenService);

  public createNewTransaction(newTransaction: NewTransactionRequest) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtTokenService.jwtToken}`);
    return this.httpClient.post(`${getBasePathUrl()}/transaction/new`, newTransaction, {
      headers
    })
  }

  public getTransactionForDashboard() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtTokenService.jwtToken}`);
    return this.httpClient.get<TransactionDashboard[]>(`${getBasePathUrl()}/transaction/dashboard`, {
      headers
    })
  }
}
