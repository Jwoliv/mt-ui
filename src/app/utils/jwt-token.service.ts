import {inject, Injectable} from '@angular/core';
import {User} from "../model/user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {
  private static readonly TOKEN_NAME: string = 'auth-jwt-token';

  private router: Router = inject(Router);


  get jwtToken(): string {
    return localStorage.getItem(JwtTokenService.TOKEN_NAME) ?? '';
  }

  public redirectToLogin() {
    this.router.navigate(['/login']).then();
  }

  public save(user: User) {
    localStorage.setItem(JwtTokenService.TOKEN_NAME, user.token);
    this.router.navigate(['']).then();
  }
}
