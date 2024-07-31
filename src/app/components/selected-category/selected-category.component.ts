import {Component, inject, Input, OnInit} from '@angular/core';
import {PageCategoryResponse} from "../../model/api-model/category.model";
import {CategoryService} from "../../services/api/entities/category.service";
import {JsonPipe, NgIf, UpperCasePipe} from "@angular/common";
import {
  ListNavTransactionsComponent
} from "../../shared/components/list-nav-transactions/list-nav-transactions.component";
import {NavigationConfig} from "../../model/component-model/navigation.model";
import {HttpConfigService} from "../../utils/http-config.service";

@Component({
  selector: 'app-selected-category',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf,
    ListNavTransactionsComponent,
    UpperCasePipe
  ],
  templateUrl: './selected-category.component.html',
  styleUrl: './selected-category.component.scss'
})
export class SelectedCategoryComponent implements OnInit {
  @Input({ required: true }) id!: number

  private categoryService: CategoryService = inject(CategoryService);

  public selectedCategory: PageCategoryResponse = {
    id: -1, name: '', transactions: { elements: [], isPrevPage: false, isNextPage: false }
  };

  get categoryUrl(): string {
    return `/categories/${this.id}`
  }

  ngOnInit(): void {
    if (this.id) {
      this.loadTransaction();
    }
  }

  public navigationConfig: NavigationConfig = {
    pageNumber: HttpConfigService.DEFAULT_PAGE_NUMBER, pageSize: HttpConfigService.DEFAULT_PAGE_SIZE
  }


  public loadTransaction(navigationConfig: NavigationConfig = this.navigationConfig) {
    this.navigationConfig = navigationConfig;
    this.categoryService.getCategoryById(this.id, this.navigationConfig).subscribe({
      next: response => {
        this.selectedCategory = response
      }
    })
  }
}
