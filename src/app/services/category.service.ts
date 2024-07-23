import {inject, Injectable} from '@angular/core';
import {Account, AccountFormDto} from "../model/account.model";
import {getBasePathUrl} from "./config/properties.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtTokenService} from "./auth/jwt-token.service";
import {BehaviorSubject} from "rxjs";
import {CategoryFormDto} from "../model/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private httpClient: HttpClient = inject(HttpClient);
  private jwtTokenService: JwtTokenService = inject(JwtTokenService);

  get headers() {
    return new HttpHeaders().set('Authorization', `Bearer ${this.jwtTokenService.jwtToken}`);
  }


  public getCategoriesForTransactionForm() {
    return this.httpClient.get<CategoryFormDto[]>(`${getBasePathUrl()}/category/form-data`, {
      headers: this.headers
    });
  }
}
