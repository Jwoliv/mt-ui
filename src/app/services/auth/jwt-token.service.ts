import {inject, Injectable} from '@angular/core';
import {User} from "../../model/user.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  private router: Router = inject(Router);


  public getJwtToken() {
    const token = localStorage.getItem('auth-jwt-token');
    return token ? JSON.parse(token) : null;
  }

  public save(user: User) {
    localStorage.setItem('auth-jwt-token', user.token);
    this.router.navigate(['']).then();
  }
}
