import {inject, Injectable} from '@angular/core';
import {NewTransactionRequest} from "../model/transaction.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtTokenService} from "./auth/jwt-token.service";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private httpClient: HttpClient = inject(HttpClient);
  private jwtTokenService: JwtTokenService = inject(JwtTokenService);

  public saveNewTransaction(newTransaction: NewTransactionRequest) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtTokenService.jwtToken}`);
    return this.httpClient.post('http://localhost:9050/api/v1/transaction/new', newTransaction, {
      headers
    })
  }
}
