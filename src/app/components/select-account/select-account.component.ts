import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import {AccountFullInfo, AccountUpdateDto} from "../../model/api-model/account.model";
import { AccountService } from "../../services/api/entities/account.service";
import { JsonPipe, NgIf } from "@angular/common";
import {
  ChangeEntityCallButtonsComponent
} from "../../shared/components/change-entity-call-buttons/change-entity-call-buttons.component";
import { Router } from "@angular/router";
import { AddAccountComponent } from "../../shared/components/add-account/add-account.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'app-select-account',
  standalone: true,
  imports: [
    JsonPipe,
    ChangeEntityCallButtonsComponent,
    AddAccountComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './select-account.component.html',
  styleUrl: './select-account.component.scss'
})
export class SelectAccountComponent implements OnInit {
  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);
  private accountService: AccountService = inject(AccountService);

  @Input() id!: number;
  public account!: AccountFullInfo;
  public isShowNewAccount: boolean = false;
  public form!: FormGroup;

  ngOnInit() {
    if (this.id) {
      const accountSub = this.accountService.getUserAccountById(this.id).subscribe({
        next: (account: AccountFullInfo) => {
          this.account = account;
          this.initializeForm();
        }
      });
      this.destroyRef.onDestroy(() => accountSub.unsubscribe());
    }
  }

  private initializeForm() {
    this.form = new FormGroup({
      name: new FormControl(this.account.name, Validators.required),
      balance: new FormControl(this.account.currentBalance, [Validators.required, Validators.min(0)]),
    });
  }

  public deleteAccountById() {
    const deleteAccountSub = this.accountService.deleteAccountById(this.id).subscribe({
      next: () => this.router.navigate(['./']).then(),
    });
    this.destroyRef.onDestroy(() => deleteAccountSub.unsubscribe());
  }

  public stopPropagation($event: MouseEvent) {
    $event.stopPropagation();
  }

  public updateExistedAccount() {
    if (this.form.valid) {
      this.accountService.updateExistedAccount(this.form.value as AccountUpdateDto, this.id).subscribe({
        next: account => this.account = account,
        complete: () => this.isShowNewAccount = false
      })
    }
  }
}
