import {Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {AccountFullInfo} from "../../model/api-model/account.model";
import {AccountService} from "../../services/api/entities/account.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-select-account',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './select-account.component.html',
  styleUrl: './select-account.component.scss'
})
export class SelectAccountComponent implements OnInit {
  private accountService: AccountService = inject(AccountService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public id = input<number>();
  public account!: AccountFullInfo

  ngOnInit() {
    if (this.id()) {
      const accountSub = this.accountService.getUserAccountById(<number>this.id()).subscribe({
        next: (account: AccountFullInfo) => this.account = account
      })
      this.destroyRef.onDestroy(() => accountSub.unsubscribe());
    }
  }
}
