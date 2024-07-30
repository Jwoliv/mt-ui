import {Component, DestroyRef, inject, Input, OnInit, viewChild} from '@angular/core';
import {AccountFullInfo, AccountUpdateDto} from "../../model/api-model/account.model";
import { AccountService } from "../../services/api/entities/account.service";
import {CurrencyPipe, JsonPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {
  ChangeEntityCallButtonsComponent
} from "../../shared/components/change-entity-call-buttons/change-entity-call-buttons.component";
import { Router } from "@angular/router";
import { AddAccountComponent } from "../../shared/components/add-account/add-account.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import {Colors} from "../../shared/app.colors";
import {PageTransactionResponse, TransactionDashboard, TransactionDto} from "../../model/api-model/transaction.model";
import {AddTransactionComponent} from "../../shared/components/transactions/add-transaction/add-transaction.component";
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";
import {
  TransactionItemComponent
} from "../../shared/components/transactions/transaction-item/transaction-item.component";
import {NavigationConfig} from "../../model/component-model/navigation.model";
import {TransactionService} from "../../services/api/entities/transaction.service";
import {HttpConfigService} from "../../utils/http-config.service";

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
    TransactionItemComponent
  ],
  templateUrl: './select-account.component.html',
  styleUrl: './select-account.component.scss'
})
export class SelectAccountComponent implements OnInit {
  @Input() id!: number;

  public navigationConfig: NavigationConfig = {
    pageNumber: HttpConfigService.DEFAULT_PAGE_NUMBER,
    pageSize: HttpConfigService.DEFAULT_PAGE_SIZE
  }

  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);
  private accountService: AccountService = inject(AccountService);
  private transactionService: TransactionService = inject(TransactionService);

  protected readonly Colors = Colors;

  public account!: AccountFullInfo;
  public responseTransactions!: PageTransactionResponse;

  public isShowNewAccount: boolean = false;
  public form!: FormGroup;
  public spendWeight!: string;
  public earnWeight!: string;


  get accountUrl(): string {
    return `/accounts/${this.id}`;
  }

  ngOnInit() {
    if (this.id) {
      this.loadTransactions()
      const accountSub = this.accountService.getUserAccountById(this.id).subscribe({
        next: (account: AccountFullInfo) => {
          this.account = account;
          this.getMoneyWeightToAccountPage()
          this.initializeForm();
        }
      });
      this.destroyRef.onDestroy(() => {
        accountSub.unsubscribe()
      });
    }
  }

  public loadTransactions(navigationConfig: NavigationConfig = this.navigationConfig): void {
    this.navigationConfig = navigationConfig;
    const transactionSub = this.transactionService.getTransactionPageable(this.navigationConfig).subscribe({
      next: (response: PageTransactionResponse) => this.responseTransactions = response
    })
    this.destroyRef.onDestroy(() => {
      transactionSub.unsubscribe()
    });
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

  private getMoneyWeightToAccountPage() {
    const mainWeight = 1030;
    const pxPerOnePercentage = mainWeight / (this.account.spendMoney + this.account.earnMoney);
    this.spendWeight = `${this.account.spendMoney * pxPerOnePercentage}px`;
    this.earnWeight = `${this.account.earnMoney * pxPerOnePercentage}px`;
  }
}
