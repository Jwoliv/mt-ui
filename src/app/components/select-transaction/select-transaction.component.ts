import {Component, DestroyRef, inject, input, Input, OnInit} from '@angular/core';
import {TransactionDto} from "../../model/api-model/transaction.model";
import {TransactionService} from "../../services/api/entities/transaction.service";
import {JsonPipe} from "@angular/common";
import {
  ChangeEntityCallButtonsComponent
} from "../../shared/components/change-entity-call-buttons/change-entity-call-buttons.component";

@Component({
  selector: 'app-select-transaction',
  standalone: true,
  imports: [
    JsonPipe,
    ChangeEntityCallButtonsComponent
  ],
  templateUrl: './select-transaction.component.html',
  styleUrl: './select-transaction.component.scss'
})
export class SelectTransactionComponent implements OnInit {
  private destroyRef: DestroyRef = inject(DestroyRef);

  public transactionService: TransactionService = inject(TransactionService);
  public id = input<number>();
  public transaction!: TransactionDto

  get _id() {
    return <number>this.id();
  }

  ngOnInit() {
    if (this.id()) {
      const transactionSub = this.transactionService.getUserTransactionById(<number>this.id()).subscribe({
        next: (transaction: TransactionDto) => this.transaction = transaction
      })
      this.destroyRef.onDestroy(() => transactionSub.unsubscribe());
    }
  }

  showUpdateTransactionForm() {

  }
}
