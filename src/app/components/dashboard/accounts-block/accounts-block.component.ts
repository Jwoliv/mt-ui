import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Account} from "../../../model/account.model";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AddAccountComponent} from "../../../shared/components/add-account/add-account.component";
import {AccountService} from "../../../services/account.service";
import {UpperTitleUiComponent} from "../../../shared/components/upper-title-ui/upper-title-ui.component";

@Component({
  selector: 'app-accounts-block',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink,
        AddAccountComponent,
        UpperTitleUiComponent
    ],
  templateUrl: './accounts-block.component.html',
  styleUrl: './accounts-block.component.scss'
})
export class AccountsBlockComponent implements OnInit {
  private accountService: AccountService = inject(AccountService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public accounts: Account[] = [];

  ngOnInit() {
    const subscription = this.accountService.dashboardAccounts$.subscribe({
      next: (accounts: Account[]) => {
        this.accounts = accounts.slice(0, 3);
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
