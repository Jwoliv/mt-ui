import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  @Input({required: true}) link!: string
  public _pageSize: number = 20;
  public _pageNumber: number = 0;
  public form = new FormGroup({
    pageSize: new FormControl(this._pageSize, [Validators.required, Validators.min(1)]),
  })
  private router: Router = inject(Router);
  @Output() private changeNavigationConfig: EventEmitter<any> = new EventEmitter();

  get prevPageNumber() {
    this._pageNumber = this._pageNumber > 1 ? this._pageNumber - 1 : 1
    console.log(this._pageNumber)
    return this._pageNumber;
  }

  get nextPageNumber() {
    this._pageNumber = this._pageNumber + 1;
    return this._pageNumber
  }

  onPrevPage() {
    if (this._pageNumber > 0) {
      this._pageNumber -= 1;
      this.sendChangesNavigationConfig();
      this.navigate();
    }
  }

  onNextPage() {
    this._pageNumber += 1;
    this.sendChangesNavigationConfig();
    this.navigate();
  }

  saveNavigationConfig() {
    this._pageSize = this.form.controls['pageSize'].value as number
    this.sendChangesNavigationConfig();
    this.navigate();
  }

  private sendChangesNavigationConfig() {
    this.changeNavigationConfig.emit({
      pageNumber: this._pageNumber,
      pageSize: this._pageSize
    })
  }

  navigate() {
    this.router.navigate([this.link], {queryParams: {pageNumber: this._pageNumber, pageSize: this._pageSize}}).then();
  }
}
