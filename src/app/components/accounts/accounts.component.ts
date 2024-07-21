import {Component, EventEmitter, inject, OnInit, viewChild, ViewChild} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";
import {AccountFullInfo} from "../../model/account.model";
import {Router, RouterLink} from "@angular/router";
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
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  public accountService: AccountService = inject(AccountService);
  public router: Router = inject(Router);
  public accounts: AccountFullInfo[] = [];

  navigationComponent = viewChild.required<NavigationComponent>('navigation')

  ngOnInit() {
    this.loadAccounts({ pageNumber: 0, pageSize: 5 });
  }

  loadAccounts(params: { pageNumber: number, pageSize: number }) {
    this.accountService.getAccounts(params).subscribe({
      next: (accounts: AccountFullInfo[]) => {
        if (accounts.length > 0) {
          this.accounts = accounts;
        } else if (params.pageNumber > 0) {
          this.rollbackPage();
        }
      }
    });
  }

  updateAccounts($event: any) {
    const pageNumber = $event.pageNumber;
    const pageSize = $event.pageSize;
    this.loadAccounts({ pageNumber, pageSize });
  }

  rollbackPage() {
    this.navigationComponent().rollbackPage();
  }
}
