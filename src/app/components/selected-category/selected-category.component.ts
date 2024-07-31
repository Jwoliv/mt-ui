import {Component, inject, Input, OnInit} from '@angular/core';
import {PageCategoryResponse} from "../../model/api-model/category.model";
import {CategoryService} from "../../services/api/entities/category.service";
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-selected-category',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf
  ],
  templateUrl: './selected-category.component.html',
  styleUrl: './selected-category.component.scss'
})
export class SelectedCategoryComponent implements OnInit {
  @Input({ required: true }) id!: number

  private categoryService: CategoryService = inject(CategoryService);

  public selectedCategory: PageCategoryResponse = {
    id: -1,
    name: '',
    transactions: {
      elements: [],
      isPrevPage: false,
      isNextPage: false
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this.categoryService.getCategoryById(this.id).subscribe({
        next: response => {
          console.log(response)
          this.selectedCategory = response
        }
      })
    }
  }


}
