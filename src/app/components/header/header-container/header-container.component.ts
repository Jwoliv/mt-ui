import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Link} from "../../../model/component-model/link.model";
import {HeaderLinkComponent} from "../header-link/header-link.component";

@Component({
  selector: 'app-header-container',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    HeaderLinkComponent
  ],
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss']
})
export class HeaderContainerComponent {
  public links: Link[] = [
    { title: 'Dashboard', url: 'dashboard' },
    { title: 'Summary', url: 'summary' },
    { title: 'Transactions', url: 'transactions' },
    { title: 'Accounts', url: 'accounts' },
    { title: 'Categories', url: 'categories' },
    { title: 'Download Reports', url: 'download-reports' },
  ];
}
