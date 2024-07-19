import {inject, Injectable} from '@angular/core';
import {NewTransactionRequest} from "../model/transaction.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private httpClient: HttpClient = inject(HttpClient);

  private readonly TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYWEyQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVTRVIiXSwiZXhwIjoxNzIxNDE5NDgxLCJpYXQiOjE3MjE0MTU4ODF9.I4dGiil7NBw88FDaZaGJT2Xyd7p3_J7UdB3LpB0Xed8'

  public saveNewTransaction(newTransaction: NewTransactionRequest) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.TOKEN}`);
    return this.httpClient.post('http://localhost:9050/api/v1/transaction/new', newTransaction, {
      headers
    })
  }
}
