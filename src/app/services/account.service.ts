import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Account, AccountFormDto, AccountFullInfo, NewAccountRequest} from '../model/account.model';
import {getBasePathUrl} from './config/properties.config';
import {JwtTokenService} from './auth/jwt-token.service';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private httpClient: HttpClient = inject(HttpClient);
  private jwtTokenService: JwtTokenService = inject(JwtTokenService);

  private dashboardAccountsSubject = new BehaviorSubject<Account[]>([]);
  public dashboardAccounts$ = this.dashboardAccountsSubject.asObservable();

  constructor() {
    this.getAccountDashboard().subscribe({
      next: (accounts: Account[]) => this.dashboardAccountsSubject.next(accounts)
    });
  }

  get headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.jwtTokenService.jwtToken}`);
  }

  public getAccountDashboard() {
    return this.httpClient.get<Account[]>(`${getBasePathUrl()}/accounts/dashboard`, { headers: this.headers });
  }

  public createNewAccount(request: NewAccountRequest) {
    return this.httpClient.post(`${getBasePathUrl()}/accounts/new`, request, { headers: this.headers });
  }

  public getAccounts(request: {pageNumber: number, pageSize: number}) {
    return this.httpClient.get<AccountFullInfo[]>(`${getBasePathUrl()}/accounts`, {
      params: request, headers: this.headers
    })
  }

  public updateDashboardAccounts(account: Account) {
    const currentAccounts = this.dashboardAccountsSubject.getValue();
    this.dashboardAccountsSubject.next([account, ...currentAccounts]);
  }

  public getAccountsForTransactionForm() {
    return this.httpClient.get<AccountFormDto[]>(`${getBasePathUrl()}/accounts/form-data`, {
      headers: this.headers
    });
  }
}
