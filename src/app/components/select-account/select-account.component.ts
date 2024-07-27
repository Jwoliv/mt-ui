import {Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {AccountFullInfo} from "../../model/api-model/account.model";
import {AccountService} from "../../services/api/entities/account.service";
import {JsonPipe} from "@angular/common";
import {
  ChangeEntityCallButtonsComponent
} from "../../shared/components/change-entity-call-buttons/change-entity-call-buttons.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-account',
  standalone: true,
  imports: [
    JsonPipe,
    ChangeEntityCallButtonsComponent
  ],
  templateUrl: './select-account.component.html',
  styleUrl: './select-account.component.scss'
})
export class SelectAccountComponent implements OnInit {
  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);

  public accountService: AccountService = inject(AccountService);
  public id = input<number>();
  public account!: AccountFullInfo


  get _id() {
    return <number>this.id();
  }

  ngOnInit() {
    if (this.id()) {
      const accountSub = this.accountService.getUserAccountById(<number>this.id()).subscribe({
        next: (account: AccountFullInfo) => this.account = account
      })
      this.destroyRef.onDestroy(() => accountSub.unsubscribe());
    }
  }

  public showUpdateAccountForm() {

  }

  public deleteAccountById() {
    const deleteAccountSub = this.accountService.deleteAccountById(<number>this.id()).subscribe({
      next: () => this.router.navigate(['./']).then(),
    })
    this.destroyRef.onDestroy(() => deleteAccountSub.unsubscribe());
  }
}
