import {Component} from '@angular/core';
import {Account} from "../../../model/account.model";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AddAccountComponent} from "../../../shared/components/add-account/add-account.component";

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
export class AccountsBlockComponent {
  public accounts: Account[] = [
    { id: 1, name: 'cash' }
  ]
}
