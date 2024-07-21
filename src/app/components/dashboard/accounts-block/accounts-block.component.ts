import {Component, inject, OnInit} from '@angular/core';
import {Account} from "../../../model/account.model";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AddAccountComponent} from "../../../shared/components/add-account/add-account.component";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-accounts-block',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    AddAccountComponent
  ],
  templateUrl: './accounts-block.component.html',
  styleUrl: './accounts-block.component.scss'
})
export class AccountsBlockComponent implements OnInit {
  private accountService: AccountService = inject(AccountService);

  public accounts: Account[] = [];

  ngOnInit() {
    this.accountService.dashboardAccounts$.subscribe({
      next: (accounts: Account[]) => {
        this.accounts = accounts.slice(0, 3);
      }
    });
  }
}
