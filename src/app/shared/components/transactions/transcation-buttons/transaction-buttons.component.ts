import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {HoverBackgroundColorDirective} from "../../../../directive/hover-background-color.directive";
import {Colors} from "../../../app.colors";

@Component({
  selector: 'app-transaction-buttons',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    HoverBackgroundColorDirective
  ],
  templateUrl: './transaction-buttons.component.html',
  styleUrl: './transaction-buttons.component.scss'
})
export class TransactionButtonsComponent {
  @Input() isMoreThenTwoAccounts!: boolean
  @Output() changeEarning: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeSpending: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeTransfer: EventEmitter<void> = new EventEmitter<void>();

  onChangeAddNewEarningTransaction = () => this.changeEarning.emit();
  onChangeAddNewSpendingTransaction = () => this.changeSpending.emit();
  onChangeAddNewTransferTransfer = () => this.changeTransfer.emit();
  protected readonly Colors = Colors;
}
