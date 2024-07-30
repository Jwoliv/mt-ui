import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavigationConfig} from "../../../model/component-model/navigation.model";
import {HttpConfigService} from "../../../utils/http-config.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input({required: true}) link!: string;
  @Input() isNext: boolean = false
  @Input() isPrev: boolean = false

  @Output() private changeNavigationConfig: EventEmitter<NavigationConfig> = new EventEmitter<NavigationConfig>();

  public pageSizeForm: FormGroup;

  public pageSize: number = HttpConfigService.DEFAULT_PAGE_SIZE;
  public pageNumber: number = HttpConfigService.DEFAULT_PAGE_NUMBER;

  private router: Router = inject(Router);

  constructor() {
    this.pageSizeForm = new FormGroup({ pageSize: new FormControl(this.pageSize) });
  }

  public onPrevPage() {
    if (this.pageNumber > 0) {
      this.pageNumber -= 1;
      this.sendChangesNavigationConfig();
      this.navigate();
    }
  }

  public onNextPage() {
    this.pageNumber += 1;
    this.sendChangesNavigationConfig();
    this.navigate();
  }

  public saveNavigationConfig() {
    this.pageSize = this.pageSizeForm.get('pageSize')?.value;
    this.sendChangesNavigationConfig();
    this.navigate();
  }

  private sendChangesNavigationConfig() {
    this.changeNavigationConfig.emit(this.getNavigationParams());
  }

  navigate() {
    this.router.navigate(
      [this.link],
      {
        queryParams: this.getNavigationParams()
      }).then();
  }

  private getNavigationParams() {
    return {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };
  }
}
