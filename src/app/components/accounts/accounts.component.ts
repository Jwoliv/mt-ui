import {Component, inject, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";
import {Account, AccountFullInfo} from "../../model/account.model";
import {RouterLink} from "@angular/router";
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";
import {AddAccountComponent} from "../../shared/components/add-account/add-account.component";
import {AccountService} from "../../services/account.service";

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
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit {
  public accountService: AccountService = inject(AccountService);
  public accounts: AccountFullInfo[] = [];

  ngOnInit() {
    this.accountService.getAccounts({pageNumber: 0, pageSize: 20}).subscribe({
      next: (accounts: AccountFullInfo[]) => {
        this.accounts = accounts
      }
    })
  }

  updateAccounts($event: any) {
    const pageNumber = $event.pageNumber;
    const pageSize = $event.pageSize;
    this.accountService.getAccounts({pageNumber: pageNumber, pageSize: pageSize}).subscribe({
      next: (accounts: AccountFullInfo[]) => {
        if (this.accounts.length > 0) {
          this.accounts = accounts
        }
      }
    })
  }
}
