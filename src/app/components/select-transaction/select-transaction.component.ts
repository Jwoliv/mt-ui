import {Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {TransactionDto} from "../../model/api-model/transaction.model";
import {TransactionService} from "../../services/api/entities/transaction.service";
import {CurrencyPipe, DatePipe, JsonPipe, NgIf, NgStyle} from "@angular/common";
import {
  ChangeEntityCallButtonsComponent
} from "../../shared/components/change-entity-call-buttons/change-entity-call-buttons.component";
import {Router, RouterLink} from "@angular/router";
import {Colors} from "../../shared/app.colors";

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
    CurrencyPipe
  ],
  templateUrl: './select-transaction.component.html',
  styleUrl: './select-transaction.component.scss'
})
export class SelectTransactionComponent implements OnInit {
  private destroyRef: DestroyRef = inject(DestroyRef);
  private router: Router = inject(Router);
  private transactionService: TransactionService = inject(TransactionService);

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

  showUpdateTransactionForm() {

  }

  deleteTransaction() {
    this.transactionService.deleteTransaction(<number>this.id()).subscribe({
      complete: () => this.router.navigate(['./']).then()
    })
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
}
