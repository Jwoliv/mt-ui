import {Component, inject, OnInit} from '@angular/core';
import {CategoryDto} from "../../model/api-model/category.model";
import {CategoryService} from "../../services/api/entities/category.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private categoryService: CategoryService = inject(CategoryService);

  public categories: CategoryDto[] = []

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: categories => this.categories = categories,
    })
  }


}
