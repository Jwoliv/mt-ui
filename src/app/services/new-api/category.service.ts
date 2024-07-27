import {inject, Injectable} from '@angular/core';
import {getBasePathUrl, getBasePathUrl2} from "../config/properties.config";
import {HttpClient} from "@angular/common/http";
import {CategoryFormDto} from "../../model/category.model";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private httpClient: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  public getCategoriesForTransactionForm(type: 'SPENDING' | 'EARNING' ) {
    return this.httpClient.get<CategoryFormDto[]>(`${getBasePathUrl2()}/category/form-data`, {
      headers: this.authService.baseHeaders,
      params: {
        type
      }
    });
  }
}
