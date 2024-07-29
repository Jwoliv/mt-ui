import {inject, Injectable} from '@angular/core';
import {User} from "../model/api-model/user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {
  public static readonly TOKEN_NAME: string = 'auth-jwt-token';

  private router: Router = inject(Router);


  get jwtToken(): string {
    return localStorage.getItem(JwtTokenService.TOKEN_NAME) ?? '';
  }

  public save(user: User) {
    localStorage.setItem(JwtTokenService.TOKEN_NAME, user.token);
    this.router.navigate(['']).then();
  }
}
