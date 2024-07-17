import {Component} from '@angular/core';
import {Account} from "../../../model/account.model";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-accounts-block',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './accounts-block.component.html',
  styleUrl: './accounts-block.component.scss'
})
export class AccountsBlockComponent {
  public accounts: Account[] = [
    { id: 1, name: 'cash' },
    { id: 2, name: 'universal card' },
    { id: 3, name: 'another card' },
  ]
}
