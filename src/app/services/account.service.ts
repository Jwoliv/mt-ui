import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Account, NewAccountRequest} from '../model/account.model';
import {getBasePathUrl} from './data/service.data';
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
      next: (accounts: Account[]) => {
        this.dashboardAccountsSubject.next(accounts);
      }
    });
  }

  public getAccountDashboard() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtTokenService.jwtToken}`);
    return this.httpClient.get<Account[]>(`${getBasePathUrl()}/accounts/dashboard`, { headers });
  }

  public createNewAccount(request: NewAccountRequest) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtTokenService.jwtToken}`);
    return this.httpClient.post(`${getBasePathUrl()}/accounts/new`, request, { headers });
  }

  public updateDashboardAccounts(account: Account) {
    const currentAccounts = this.dashboardAccountsSubject.getValue();
    this.dashboardAccountsSubject.next([account, ...currentAccounts]);
  }
}
