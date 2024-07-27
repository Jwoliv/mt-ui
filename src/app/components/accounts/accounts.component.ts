import {Component, DestroyRef, inject, Input, OnInit, viewChild} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";
import {AccountFullInfo} from "../../model/api-model/account.model";
import {RouterLink} from "@angular/router";
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";
import {AddAccountComponent} from "../../shared/components/add-account/add-account.component";
import {AccountService} from "../../services/api/entities/account.service";
import {NavigationConfig} from "../../model/component-model/navigation.model";

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    CurrencyPipe,
    NavigationComponent,
    AddAccountComponent
  ],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  private navigationComponent = viewChild.required<NavigationComponent>('navigation')
  private destroyRef: DestroyRef = inject(DestroyRef);
  private accountService: AccountService = inject(AccountService);

  @Input() public navigationConfig!: NavigationConfig;
  public accounts: AccountFullInfo[] = [];

  ngOnInit() {
    this.loadAccounts();
  }

  public updateAccounts(navigationConfig: NavigationConfig): void {
    this.loadAccounts({ pageNumber: navigationConfig.pageNumber, pageSize: navigationConfig.pageSize });
  }

  private loadAccounts(navigationConfig: NavigationConfig = this.navigationConfig): void {
    this.navigationConfig = navigationConfig;
    const subscription = this.accountService.getAccounts(this.navigationConfig).subscribe({
      next: (accounts: AccountFullInfo[]) => {
        if (accounts.length > 0) {
          this.accounts = accounts;
        } else if (navigationConfig.pageNumber > 0) {
          this.rollbackPage();
        }
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private rollbackPage() {
    this.navigationComponent().rollbackPage();
  }
}
