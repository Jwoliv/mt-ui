import {Component, EventEmitter, inject, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "../../../services/api/entities/account.service";
import {Account} from "../../../model/account.model";
import {UpperTitleUiComponent} from "../upper-title-ui/upper-title-ui.component";

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    UpperCasePipe,
    UpperTitleUiComponent
  ],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss'
})
export class AddAccountComponent {
  @Output() updateAccounts: EventEmitter<Account> = new EventEmitter<Account>();

  public accountService: AccountService = inject(AccountService);
  public isShowNewAccount: boolean = false;
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    startBalance: new FormControl(0, [Validators.required, Validators.min(0)]),
  })

  public stopPropagation(event: Event) {
    event.stopPropagation();
  }

  public createNewAccount(): void {
    if (this.form.valid) {
      this.accountService.createNewAccount(this.form.value).subscribe({
        next: (response) => {
          this.accountService.updateDashboardAccounts(response as Account)
          this.updateAccounts.emit(response as Account);
        },
        complete: () => {
          this.form.reset();
          this.isShowNewAccount = false;
        }
      });
    }
  }
}
