import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TransactionButtonsComponent} from "../transcation-buttons/transaction-buttons.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

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
  public data = {
    earningCategories: [{id: 1, name: 'Salary'}, {id: 2, name: 'Investment'},],
    spendingCategories: [{id: 1, name: 'Food'}, {id: 2, name: 'Travel'},],
    accounts: [{id: 1, name: 'Cash'}, {id: 2, name: 'Universal Card'},],
    total: 20000
  }

  public isShowNewEarning = false
  public isShowNewSpending = false
  public isShowNewTransfer = false

  earningForm: FormGroup = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    accountId: new FormControl<number>(this.data.accounts[0].id, [Validators.required]),
    categoryId: new FormControl<number>(this.data.earningCategories[0].id, [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    sender: new FormControl('', []),
    note: new FormControl('', []),
    type: new FormControl('EARNING')
  })

  spendingForm: FormGroup = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    accountId: new FormControl<number>(this.data.accounts[0].id, [Validators.required]),
    categoryId: new FormControl<number>(this.data.spendingCategories[0].id, [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
    sender: new FormControl('', []),
    note: new FormControl('', []),
    type: new FormControl('SPENDING')
  })

  transferForm: FormGroup = new FormGroup({
    amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    date: new FormControl(new Date(), [Validators.required]),
    sender: new FormControl(this.data.accounts[0].id, []),
    receiver: new FormControl(this.data.accounts[1].id, []),
  })

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  onChangeAddNewEarningTransaction = (status: boolean) => this.isShowNewEarning = status;
  onChangeAddNewSpendingTransaction = (status: boolean) => this.isShowNewSpending = status;
  onChangeAddNewTransferTransaction = (status: boolean) => this.isShowNewTransfer = status;

  onCloseForm() {
    this.isShowNewEarning = false;
    this.isShowNewSpending = false;
    this.isShowNewTransfer = false;
  }

  onSubmitEarningForm() {
    console.log(this.earningForm);
    this.onCloseForm();
  }

  onSubmitSpendingForm() {
    console.log(this.spendingForm);
    this.onCloseForm();
  }

  onSubmitTransferForm() {
    console.log(this.transferForm);
    this.onCloseForm();
  }

}