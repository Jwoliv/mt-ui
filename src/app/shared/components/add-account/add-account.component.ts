import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss'
})
export class AddAccountComponent {
  isShowNewAccount: boolean = false;

  onCloseForms() {
    this.isShowNewAccount = false;
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

}
