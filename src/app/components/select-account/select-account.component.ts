import {Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import {AccountFullInfo, AccountUpdateDto} from "../../model/api-model/account.model";
import {AccountService} from "../../services/api/entities/account.service";
import {CurrencyPipe, JsonPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {
  ChangeEntityCallButtonsComponent
} from "../../shared/components/change-entity-call-buttons/change-entity-call-buttons.component";
import {AddAccountComponent} from "../../shared/components/add-account/add-account.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Colors} from "../../shared/app.colors";
import {PageTransactionResponse} from "../../model/api-model/transaction.model";
import {AddTransactionComponent} from "../../shared/components/transactions/add-transaction/add-transaction.component";
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";
import {
  TransactionItemComponent
} from "../../shared/components/transactions/transaction-item/transaction-item.component";
import {NavigationConfig} from "../../model/component-model/navigation.model";
import {HttpConfigService} from "../../utils/http-config.service";
import {SelectedAccountService} from "../../services/api/complex/selected-account.service";
import {
  ListNavTransactionsComponent
} from "../../shared/components/list-nav-transactions/list-nav-transactions.component";

@Component({
  selector: 'app-select-account',
  standalone: true,
  imports: [
    JsonPipe,
    ChangeEntityCallButtonsComponent,
    AddAccountComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgStyle,
    CurrencyPipe,
    AddTransactionComponent,
    NavigationComponent,
    NgForOf,
    TransactionItemComponent,
    ListNavTransactionsComponent
  ],
  templateUrl: './select-account.component.html',
  styleUrl: './select-account.component.scss'
})
export class SelectAccountComponent implements OnInit {
  @Input() id!: number;

  private destroyRef: DestroyRef = inject(DestroyRef);
  private accountService: AccountService = inject(AccountService);

  public selectedAccountService: SelectedAccountService = inject(SelectedAccountService);

  protected readonly Colors = Colors;

  public account!: AccountFullInfo;
  public responseTransactions!: PageTransactionResponse;

  public isShowNewAccount: boolean = false;
  public form!: FormGroup;
  public weights: { spendWeight: string, earnWeight: string } = { earnWeight: '0px', spendWeight: '0px' };


  get accountUrl(): string {
    return `/accounts/${this.id}`;
  }

  ngOnInit() {
    if (this.id) {
      this.loadTransactions({
        pageNumber: HttpConfigService.DEFAULT_PAGE_NUMBER,
        pageSize: HttpConfigService.DEFAULT_PAGE_SIZE,
      })
      const accountSub = this.accountService.getUserAccountById(this.id).subscribe({
        next: (account: AccountFullInfo) => {
          this.account = account;
          this.weights = this.selectedAccountService.getMoneyWeightToAccountPage(this.account)
          this.initializeForm();
        }
      });
      this.destroyRef.onDestroy(() => accountSub.unsubscribe());
    }
  }

  public loadTransactions(navigationConfig: NavigationConfig) {
    const transactionSub = this.selectedAccountService.getTransactionPageable(navigationConfig).subscribe({
      next: (response: PageTransactionResponse) => this.responseTransactions = response
    })
    this.destroyRef.onDestroy(() => transactionSub.unsubscribe());
  }

  private initializeForm() {
    this.form = new FormGroup({
      name: new FormControl(this.account.name, Validators.required),
      balance: new FormControl(this.account.currentBalance, [Validators.required, Validators.min(0)]),
    });
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
