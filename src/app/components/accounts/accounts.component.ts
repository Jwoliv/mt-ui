import {Component, inject, OnInit, viewChild} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";
import {AccountFullInfo} from "../../model/account.model";
import {RouterLink} from "@angular/router";
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";
import {AddAccountComponent} from "../../shared/components/add-account/add-account.component";
import {AccountService} from "../../services/account.service";
import {NavigationConfig} from "../../model/navigation.model";
import {DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE} from "../../services/config/properties.config";

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
  public accountService: AccountService = inject(AccountService);

  public accounts: AccountFullInfo[] = [];

  ngOnInit() {
    this.loadAccounts({ pageNumber: DEFAULT_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE });
  }

  loadAccounts(navigationConfig: NavigationConfig): void {
    this.accountService.getAccounts(navigationConfig).subscribe({
      next: (accounts: AccountFullInfo[]) => {
        if (accounts.length > 0) {
          this.accounts = accounts;
        } else if (navigationConfig.pageNumber > 0) {
          this.rollbackPage();
        }
      }
    });
  }

  public updateAccounts(navigationConfig: NavigationConfig): void {
    this.loadAccounts({ pageNumber: navigationConfig.pageNumber, pageSize: navigationConfig.pageSize });
  }

  public rollbackPage() {
    this.navigationComponent().rollbackPage();
  }
}
