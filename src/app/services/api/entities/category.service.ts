import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryDto, CategoryFormDto, PageCategoryResponse} from "../../../model/api-model/category.model";
import {AuthService} from "../auth/auth.service";
import {HttpConfigService} from "../../../utils/http-config.service";
import {NavigationConfig} from "../../../model/component-model/navigation.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  public getCategoriesForTransactionForm(type: 'SPENDING' | 'EARNING' ) {
    return this.httpClient.get<CategoryFormDto[]>(`${HttpConfigService.CATEGORY_PATH}/form-data`, {
      headers: this.authService.baseHeaders,
      params: {
        type
      }
    });
  }

  public getCategoryById(id: number, navigationConfig: NavigationConfig) {
    return this.httpClient.get<PageCategoryResponse>(`${HttpConfigService.CATEGORY_PATH}/${id}`, {
      headers: this.authService.baseHeaders,
      params: {
        pageSize: navigationConfig.pageSize,
        pageNumber: navigationConfig.pageNumber
      }
    });
  }

  public getCategories() {
    return this.httpClient.get<CategoryDto[]>(HttpConfigService.CATEGORY_PATH, {
      headers: this.authService.baseHeaders
    });
  }
}
