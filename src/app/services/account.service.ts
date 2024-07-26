import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account, AccountFormDto, AccountFullInfo, NewAccountRequest} from '../model/account.model';
import {getBasePathUrl} from './config/properties.config';
import {BehaviorSubject} from "rxjs";
import {AuthService} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  private dashboardAccountsSubject = new BehaviorSubject<Account[]>([]);

  constructor() {
    this.getAccountDashboard().subscribe({
      next: (accounts: Account[]) => this.dashboardAccountsSubject.next(accounts)
    });
  }

  public getAccountDashboard() {
    return this.httpClient.get<Account[]>(`${getBasePathUrl()}/accounts/dashboard`, {
      headers: this.authService.baseHeaders
    });
  }

  public createNewAccount(request: NewAccountRequest) {
    return this.httpClient.post(`${getBasePathUrl()}/accounts/new`, request, {
      headers: this.authService.baseHeaders
    });
  }

  public getAccounts(request: {pageNumber: number, pageSize: number}) {
    return this.httpClient.get<AccountFullInfo[]>(`${getBasePathUrl()}/accounts`, {
      params: request,
      headers: this.authService.baseHeaders
    })
  }

  public getAccountsForTransactionForm() {
    return this.httpClient.get<AccountFormDto[]>(`${getBasePathUrl()}/accounts/form-data`, {
      headers: this.authService.baseHeaders
    });
  }

  public updateDashboardAccounts(account: Account) {
    const currentAccounts = this.dashboardAccountsSubject.getValue();
    this.dashboardAccountsSubject.next([account, ...currentAccounts]);
  }
}
