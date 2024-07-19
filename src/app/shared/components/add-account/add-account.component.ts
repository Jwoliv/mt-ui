import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {NewFormComponent} from "../new-form/new-form.component";

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NewFormComponent
  ],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss'
})
export class AddAccountComponent {
  isShowNewAccount: boolean = false;


  onChangeAddNewAccount = (status: boolean) => this.isShowNewAccount = status;
}
