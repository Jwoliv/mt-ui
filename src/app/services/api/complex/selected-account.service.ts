import {DestroyRef, inject, Injectable} from '@angular/core';
import {NavigationConfig} from "../../../model/component-model/navigation.model";
import {AccountFullInfo} from "../../../model/api-model/account.model";
import {HttpConfigService} from "../../../utils/http-config.service";
import {Router} from "@angular/router";
import {AccountService} from "../entities/account.service";
import {TransactionService} from "../entities/transaction.service";

@Injectable({
  providedIn: 'root'
})
export class SelectedAccountService {
  private navigationConfig: NavigationConfig = { pageNumber: HttpConfigService.DEFAULT_PAGE_NUMBER, pageSize: HttpConfigService.DEFAULT_PAGE_SIZE }
  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);
  private accountService: AccountService = inject(AccountService);
  private transactionService: TransactionService = inject(TransactionService);

  public getTransactionPageable(id: number, navigationConfig: NavigationConfig = this.navigationConfig) {
    this.navigationConfig = navigationConfig;
    return this.transactionService.getTransactionByAccountId(id, this.navigationConfig);
  }


  public deleteAccountById(id: number) {
    const deleteAccountSub = this.accountService.deleteAccountById(id).subscribe({
      next: () => this.router.navigate(['./']).then(),
    });
    this.destroyRef.onDestroy(() => deleteAccountSub.unsubscribe());
  }

  public getMoneyWeightToAccountPage(account: AccountFullInfo): { spendWeight: string, earnWeight: string } {
    const mainWeight = 1030;
    const pxPerOnePercentage = mainWeight / (account.spendMoney + account.earnMoney);
    return {
      spendWeight: `${account.spendMoney * pxPerOnePercentage}px`,
      earnWeight: `${account.earnMoney * pxPerOnePercentage}px`
    };
  }
}
