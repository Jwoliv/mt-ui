import {Component, inject, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TransactionButtonsComponent} from "../transcation-buttons/transaction-buttons.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TransactionService} from "../../../../services/transaction.service";
import {NewTransactionRequest} from "../../../../model/transaction.model";
import {AccountFormDto} from "../../../../model/account.model";
import {CategoryFormDto} from "../../../../model/category.model";
import {AccountService} from "../../../../services/account.service";
import {CategoryService} from "../../../../services/category.service";

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    NgForOf,
    TransactionButtonsComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss'
})
export class AddTransactionComponent implements OnInit {
  public transactionService: TransactionService = inject(TransactionService);
  public accountService: AccountService = inject(AccountService);
  public categoryService: CategoryService = inject(CategoryService);

  public spendingCategories: CategoryFormDto[] = [];
  public earningCategories: CategoryFormDto[] = [];
  public accounts: AccountFormDto[] = [];

  public isShowNewEarning = false;
  public isShowNewSpending = false;
  public isShowNewTransfer = false;

  public earningForm!: FormGroup;
  public spendingForm!: FormGroup;
  public transferForm!: FormGroup;

  ngOnInit() {
    this.accountService.getAccountsForTransactionForm().subscribe({
      next: accounts => {
        this.accounts = accounts;
        this.initializeForms();
      }
    });

    this.categoryService.getCategoriesForTransactionForm('SPENDING').subscribe({
      next: categories => {
        this.spendingCategories = categories;
        this.initializeForms();
      }
    });

    this.categoryService.getCategoriesForTransactionForm('EARNING').subscribe({
      next: categories => {
        this.earningCategories = categories;
        this.initializeForms();
      }
    });
  }

  private initializeForms() {
    if (this.accounts.length > 0 && this.earningCategories.length > 0 && this.spendingCategories.length > 0) {
      this.earningForm = new FormGroup({
        amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
        accountId: new FormControl<number>(this.accounts[0].id, [Validators.required]),
        categoryId: new FormControl<number>(this.earningCategories[0].id, [Validators.required]),
        date: new FormControl(new Date(), [Validators.required]),
        sender: new FormControl(''),
        note: new FormControl(''),
        type: new FormControl('EARNING')
      });

      this.spendingForm = new FormGroup({
        amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
        accountId: new FormControl<number>(this.accounts[0].id, [Validators.required]),
        categoryId: new FormControl<number>(this.spendingCategories[0].id, [Validators.required]),
        date: new FormControl(new Date(), [Validators.required]),
        sender: new FormControl(''),
        note: new FormControl(''),
        type: new FormControl('SPENDING')
      });

      this.transferForm = new FormGroup({
        amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
        date: new FormControl(new Date(), [Validators.required]),
        senderAccount: new FormControl(this.accounts[0].id),
        receiverAccount: new FormControl(this.accounts[1].id),
        type: new FormControl('TRANSFER')
      });
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  toggleEarningForm(status: boolean) {
    this.isShowNewEarning = status;
  }

  toggleSpendingForm(status: boolean) {
    this.isShowNewSpending = status;
  }

  toggleTransferForm(status: boolean) {
    this.isShowNewTransfer = status;
  }

  closeAllForms() {
    this.isShowNewEarning = false;
    this.isShowNewSpending = false;
    this.isShowNewTransfer = false;
  }

  submitEarningForm() {
    console.log(this.earningForm.value);
    this.transactionService.createNewTransaction(this.earningForm.value as NewTransactionRequest).subscribe({
      next: response => console.log(response)
    });
    this.closeAllForms();
  }

  submitSpendingForm() {
    console.log(this.spendingForm.value);
    this.transactionService.createNewTransaction(this.spendingForm.value as NewTransactionRequest).subscribe({
      next: response => console.log(response)
    });
    this.closeAllForms();
  }

  submitTransferForm() {
    console.log(this.transferForm.value);
    this.transactionService.createNewTransaction(this.transferForm.value as NewTransactionRequest).subscribe({
      next: response => console.log(response)
    });
    this.closeAllForms();
  }
}
