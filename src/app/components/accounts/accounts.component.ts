import {Component, inject} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";
import {AccountFullInfo} from "../../model/account.model";
import {Router, RouterLink} from "@angular/router";
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    CurrencyPipe,
    NavigationComponent
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent {
  public accounts: AccountFullInfo[] = [
    {id: 1, name: 'cash', spending: 1000, earning: 200},
    {id: 1, name: 'cash', spending: 1000, earning: 200},
    {id: 1, name: 'cash', spending: 1000, earning: 200},
    {id: 1, name: 'cash', spending: 1000, earning: 200},
    {id: 1, name: 'cash', spending: 1000, earning: 200},
    {id: 1, name: 'cash', spending: 1000, earning: 200},
    {id: 1, name: 'cash', spending: 1000, earning: 200},
    {id: 1, name: 'cash', spending: 1000, earning: 200},
    {id: 1, name: 'cash', spending: 1000, earning: 200},
    {id: 1, name: 'cash', spending: 1000, earning: 200},
    {id: 1, name: 'cash', spending: 1000, earning: 200},
    {id: 1, name: 'cash', spending: 1000, earning: 200},
  ];

}
