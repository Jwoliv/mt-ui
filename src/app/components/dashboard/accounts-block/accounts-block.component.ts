import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Account} from "../../../model/account.model";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AddAccountComponent} from "../../../shared/components/add-account/add-account.component";
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
export class AccountsBlockComponent {
  @Input() public accounts!: Account[];

  public updateAccounts(account: Account) {
    this.accounts.unshift(account)
  }
}
