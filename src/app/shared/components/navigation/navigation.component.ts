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
  @Input({required: true}) link!: string;
  public _pageSize: number = 5;
  public _pageNumber: number = 0;
  public form = new FormGroup({
    pageSize: new FormControl(this._pageSize, [Validators.required, Validators.min(1)]),
  });
  private router: Router = inject(Router);
  @Output() private changeNavigationConfig: EventEmitter<any> = new EventEmitter();

  get prevPageNumber() {
    return this._pageNumber > 0 ? this._pageNumber - 1 : 0;
  }

  get nextPageNumber() {
    return this._pageNumber + 1;
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
    this._pageSize = this.form.controls['pageSize'].value as number;
    this.sendChangesNavigationConfig();
    this.navigate();
  }

  private sendChangesNavigationConfig() {
    this.changeNavigationConfig.emit({
      pageNumber: this._pageNumber,
      pageSize: this._pageSize
    });
  }

  navigate() {
    this.router.navigate([this.link], { queryParams: { pageNumber: this._pageNumber, pageSize: this._pageSize } }).then();
  }

  rollbackPage() {
    if (this._pageNumber > 0) {
      this._pageNumber -= 1;
      this.sendChangesNavigationConfig();
      this.navigate();
    }
  }
}
