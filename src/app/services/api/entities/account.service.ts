import {DestroyRef, inject, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  Account,
  AccountFormDto,
  AccountFullInfo,
  AccountUpdateDto,
  NewAccountRequest, PageAccountResponse
} from '../../../model/api-model/account.model';
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {HttpConfigService} from "../../../utils/http-config.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {
  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private dashboardAccountsSubject = new BehaviorSubject<Account[]>([]);

  ngOnInit() {
    const accountSub = this.getAccountDashboard().subscribe({
      next: (accounts: Account[]) => this.dashboardAccountsSubject.next(accounts)
    });

    this.destroyRef.onDestroy(() => accountSub.unsubscribe());
  }

  public getAccountDashboard() {
    return this.httpClient.get<Account[]>(`${HttpConfigService.ACCOUNT_PATH}/dashboard`, {
      headers: this.authService.baseHeaders
    });
  }

  public createNewAccount(request: NewAccountRequest) {
    return this.httpClient.post<AccountFullInfo>(`${HttpConfigService.ACCOUNT_PATH}/new`, request, {
      headers: this.authService.baseHeaders
    });
  }

  public getAccountsByPageable(request: {pageNumber: number, pageSize: number}) {
    return this.httpClient.get<PageAccountResponse>(HttpConfigService.ACCOUNT_PATH, {
      params: request,
      headers: this.authService.baseHeaders
    })
  }

  public getAccountsForTransactionForm() {
    return this.httpClient.get<AccountFormDto[]>(`${HttpConfigService.ACCOUNT_PATH}/form-data`, {
      headers: this.authService.baseHeaders
    });
  }

  public getUserAccountById(id: number) {
    return this.httpClient.get<AccountFullInfo>(`${HttpConfigService.ACCOUNT_PATH}/${id}`, {
      headers: this.authService.baseHeaders
    });
  }

  public deleteAccountById(id: number) {
    return this.httpClient.delete<void>(`${HttpConfigService.ACCOUNT_PATH}/${id}`, {
      headers: this.authService.baseHeaders
    })
  }

  public updateExistedAccount(request: AccountUpdateDto, id: number) {
    return this.httpClient.patch<AccountFullInfo>(`${HttpConfigService.ACCOUNT_PATH}/${id}`, request, {
      headers: this.authService.baseHeaders
    })
  }

  public updateDashboardAccounts(account: AccountFullInfo) {
    const currentAccounts = this.dashboardAccountsSubject.getValue();
    this.dashboardAccountsSubject.next([account, ...currentAccounts]);
  }
}
