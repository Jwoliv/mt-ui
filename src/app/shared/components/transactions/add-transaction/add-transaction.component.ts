import {Component, inject} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TransactionButtonsComponent} from "../transcation-buttons/transaction-buttons.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TransactionService} from "../../../../services/transaction.service";
import {NewTransactionRequest} from "../../../../model/transaction.model";

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
export class AddTransactionComponent {
  public transactionService: TransactionService = inject(TransactionService);

  public data = {
    earningCategories: [{id: 1, name: 'Salary'}, {id: 2, name: 'Investment'}],
    spendingCategories: [{id: 1, name: 'Food'}, {id: 2, name: 'Travel'}],
    accounts: [{id: 1, name: 'Cash'}, {id: 2, name: 'Universal Card'}],
    total: 20000
  }

  public isShowNewEarning = false;
  public isShowNewSpending = false;
  public isShowNewTransfer = false;

  public earningForm = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    accountId: new FormControl<number>(this.data.accounts[0].id, [Validators.required]),
    categoryId: new FormControl<number>(this.data.earningCategories[0].id, [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    sender: new FormControl(''),
    note: new FormControl(''),
    type: new FormControl('EARNING')
  });

  public spendingForm = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    accountId: new FormControl<number>(this.data.accounts[0].id, [Validators.required]),
    categoryId: new FormControl<number>(this.data.spendingCategories[0].id, [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    sender: new FormControl(''),
    note: new FormControl(''),
    type: new FormControl('SPENDING')
  });

  public transferForm = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    date: new FormControl(new Date(), [Validators.required]),
    senderAccount: new FormControl(this.data.accounts[0].id),
    receiverAccount: new FormControl(this.data.accounts[1].id),
    type: new FormControl('TRANSFER')
  });

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
    this.transactionService.saveNewTransaction(this.earningForm.value as NewTransactionRequest).subscribe({
      next: response => console.log(response)
    });
    this.closeAllForms();
  }

  submitSpendingForm() {
    console.log(this.spendingForm.value);
    this.transactionService.saveNewTransaction(this.spendingForm.value as NewTransactionRequest).subscribe({
      next: response => console.log(response)
    });
    this.closeAllForms();
  }

  submitTransferForm() {
    console.log(this.transferForm.value);
    this.transactionService.saveNewTransaction(this.transferForm.value as NewTransactionRequest).subscribe({
      next: response => console.log(response)
    });
    this.closeAllForms();
  }
}