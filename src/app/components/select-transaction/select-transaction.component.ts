import {Component, DestroyRef, inject, input, Input, OnInit} from '@angular/core';
import {TransactionDto} from "../../model/api-model/transaction.model";
import {TransactionService} from "../../services/api/entities/transaction.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-select-transaction',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './select-transaction.component.html',
  styleUrl: './select-transaction.component.scss'
})
export class SelectTransactionComponent implements OnInit {
  private transactionService: TransactionService = inject(TransactionService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public id = input<number>();
  public transaction!: TransactionDto

  ngOnInit() {
    if (this.id()) {
      const transactionSub = this.transactionService.getUserTransactionById(<number>this.id()).subscribe({
        next: (transaction: TransactionDto) => this.transaction = transaction
      })
      this.destroyRef.onDestroy(() => transactionSub.unsubscribe());
    }
  }
}
