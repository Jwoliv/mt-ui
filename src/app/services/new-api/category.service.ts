import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryFormDto} from "../../model/category.model";
import {AuthService} from "../auth/auth.service";
import {HttpConfigService} from "../../utils/http-config.service";

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
}
