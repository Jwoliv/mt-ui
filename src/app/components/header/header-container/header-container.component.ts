import {Component, inject} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Link} from "../../../model/component-model/link.model";
import {HeaderLinkComponent} from "../header-link/header-link.component";
import {AuthService} from "../../../services/api/auth/auth.service";

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
  public authService: AuthService = inject(AuthService);

  public links: Link[] = [
    { title: 'Dashboard', url: 'dashboard' },
    { title: 'Summary', url: 'summary' },
    { title: 'Transactions', url: 'transactions' },
    { title: 'Accounts', url: 'accounts' },
    { title: 'Categories', url: 'categories' },
    { title: 'Download Reports', url: 'download-reports' },
  ];
}
