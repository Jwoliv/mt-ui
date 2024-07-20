import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss'
})
export class AddAccountComponent {
  public isShowNewAccount: boolean = false;
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    startBalance: new FormControl(0, [Validators.required, Validators.min(0)]),
  })

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  createNewAccount() {
    console.log(this.form.value)
    this.isShowNewAccount = false;
  }
}
