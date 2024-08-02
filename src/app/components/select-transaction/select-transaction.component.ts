import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { TransactionDto } from "../../model/api-model/transaction.model";
import { TransactionService } from "../../services/api/entities/transaction.service";
import { CurrencyPipe, DatePipe, JsonPipe, NgForOf, NgIf, NgStyle } from "@angular/common";
import { ChangeEntityCallButtonsComponent } from "../../shared/components/change-entity-call-buttons/change-entity-call-buttons.component";
import { Router, RouterLink } from "@angular/router";
import { Colors } from "../../shared/app.colors";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AccountService } from "../../services/api/entities/account.service";
import { AccountFormDto } from "../../model/api-model/account.model";
import { CategoryFormDto } from "../../model/api-model/category.model";
import { CategoryService } from "../../services/api/entities/category.service";

@Component({
  selector: 'app-select-transaction',
  standalone: true,
  imports: [
    JsonPipe,
    ChangeEntityCallButtonsComponent,
    NgIf,
    NgStyle,
    RouterLink,
    DatePipe,
    CurrencyPipe,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './select-transaction.component.html',
  styleUrls: ['./select-transaction.component.scss']
})
export class SelectTransactionComponent implements OnInit {
  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);
  private transactionService: TransactionService = inject(TransactionService);
  private accountService: AccountService = inject(AccountService);
  private categoryService: CategoryService = inject(CategoryService);

  @Input() public id!: number;
  public usualTransactionForm!: FormGroup;
  public transferForm!: FormGroup;

  public isShowUsualForm: boolean = false;
  public isShowTransferForm: boolean = false;

  public transaction!: TransactionDto;
  public accounts: AccountFormDto[] = [];
  private _categories: { spendingCategories: CategoryFormDto[], earningCategories: CategoryFormDto[]} = {
    spendingCategories: [],
    earningCategories: []
  };

  get categories(): CategoryFormDto[] {
    return this.transaction.type === 'SPENDING'
      ? this._categories.spendingCategories
      : this._categories.earningCategories;
  }

  ngOnInit() {
    if (this.id) {
      const transactionSub = this.transactionService.getUserTransactionById(this.id).subscribe({
        next: (transaction: TransactionDto) => {
          this.transaction = transaction;
          if (this.transaction.type === 'SPENDING') {
            const spendCategorySub = this.categoryService.getCategoriesForTransactionForm('SPENDING').subscribe({
              next: categories => this._categories.spendingCategories = categories
            });
            this.destroyRef.onDestroy(() => spendCategorySub.unsubscribe());
          } else {
            const earnCategorySub = this.categoryService.getCategoriesForTransactionForm('EARNING').subscribe({
              next: categories => this._categories.earningCategories = categories
            });
            this.destroyRef.onDestroy(() => earnCategorySub.unsubscribe());
          }

          const formattedDate = new Date(this.transaction.date).toISOString().split('T')[0];

          if (this.transaction.type === "TRANSFER") {
            this.transferForm = new FormGroup({
              amount: new FormControl(this.transaction.amount, [Validators.required, Validators.min(0.01)]),
              date: new FormControl(this.transaction.date, [Validators.required]),
              senderAccount: new FormControl(this.transaction.accountId, [Validators.required]),
              receiverAccount: new FormControl(this.transaction.receiverAccountId, [Validators.required]),
              type: new FormControl(this.transaction.type)
            });
          } else {
            this.usualTransactionForm = new FormGroup({
              amount: new FormControl(this.transaction.amount, [Validators.required, Validators.min(0.01)]),
              accountId: new FormControl<number>(this.transaction.accountId, [Validators.required]),
              categoryId: new FormControl<number>(this.transaction.categoryId, [Validators.required]),
              date: new FormControl(formattedDate, [Validators.required]),
              sender: new FormControl(this.transaction.sender),
              note: new FormControl(this.transaction.note),
              type: new FormControl(this.transaction.type)
            });
          }
        },
        error: (err) => console.error('Failed to load transaction', err)
      });

      const accountsSub = this.accountService.getAccountsForTransactionForm().subscribe({
        next: accounts => this.accounts = accounts,
        error: (err) => console.error('Failed to load accounts', err)
      });

      this.destroyRef.onDestroy(() => {
        transactionSub.unsubscribe();
        accountsSub.unsubscribe();
      });
    }
  }

  showUpdateTransactionForm() {
    if (this.transaction.type === 'TRANSFER') {
      this.isShowTransferForm = true;
    } else {
      this.isShowUsualForm = true;
    }
  }

  deleteTransaction() {
    this.transactionService.deleteTransaction(this.id).subscribe({
      complete: () => this.router.navigate(['./']).then()
    });
  }

  public determineBackgroundColor() {
     switch (this.transaction.type) {
       case "EARNING":
         return Colors.LIGHT_GREEN;
       case "SPENDING":
         return Colors.LIGHT_RED;
       case "TRANSFER":
         return Colors.LIGHT_BLUE;
    }
  }

  updateTransaction(form: FormGroup) {
    const transactionSub = this.transactionService.updateTransaction(form.value, this.id).subscribe({
      next: (transaction: TransactionDto) => {
        this.transaction = transaction;
        this.closeAllForms();
      },
      error: (err) => console.error('Failed to update transaction', err)
    });
    this.destroyRef.onDestroy(() => transactionSub.unsubscribe());
  }

  stopPropagation($event: MouseEvent) {
    $event.stopPropagation();
  }

  closeAllForms() {
    this.isShowUsualForm = false;
    this.isShowTransferForm = false;
  }
}
