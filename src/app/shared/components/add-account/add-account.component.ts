import {Component, EventEmitter, inject, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "../../../services/api/entities/account.service";
import {AccountFullInfo} from "../../../model/api-model/account.model";
import {UpperTitleUiComponent} from "../upper-title-ui/upper-title-ui.component";
import {HoverBackgroundColorDirective} from "../../../directive/hover-background-color.directive";
import {Colors} from "../../app.colors";

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
    UpperTitleUiComponent,
    HoverBackgroundColorDirective
  ],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss'
})
export class AddAccountComponent {
  @Output() updateAccounts: EventEmitter<AccountFullInfo> = new EventEmitter<AccountFullInfo>();

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
          this.accountService.updateDashboardAccounts(response)
          this.updateAccounts.emit(response);
        },
        complete: () => {
          this.form.reset();
          this.isShowNewAccount = false;
        }
      });
    }
  }

  protected readonly Colors = Colors;
}
