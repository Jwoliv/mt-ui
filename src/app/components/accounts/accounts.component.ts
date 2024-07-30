import {Component, DestroyRef, inject, Input, OnInit, viewChild} from '@angular/core';
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {AccountFullInfo, PageAccountResponse} from "../../model/api-model/account.model";
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
    AddAccountComponent,
    NgIf
  ],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  @Input() public navigationConfig!: NavigationConfig;

  private destroyRef: DestroyRef = inject(DestroyRef);
  private accountService: AccountService = inject(AccountService);

  public response: PageAccountResponse = { elements: [], isNextPage: false, isPrevPage: false }

  ngOnInit() {
    this.loadAccounts();
  }

  public updateAccounts(navigationConfig: NavigationConfig): void {
    this.loadAccounts({ pageNumber: navigationConfig.pageNumber, pageSize: navigationConfig.pageSize });
  }

  private loadAccounts(navigationConfig: NavigationConfig = this.navigationConfig): void {
    this.navigationConfig = navigationConfig;
    const subscription = this.accountService.getAccountsByPageable(this.navigationConfig).subscribe({
      next: (response: PageAccountResponse) => {
        console.log(response)
        this.response = response
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  public unshiftAccountToCollection(account: AccountFullInfo) {
    this.response.elements.unshift(account)
  }
}
