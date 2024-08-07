import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginCredentialsRequest, SignUpCredentialsRequest} from "../../../model/api-model/auth.model";
import {JwtTokenService} from "../../../utils/jwt-token.service";
import {HttpConfigService} from "../../../utils/http-config.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private jwtTokenService: JwtTokenService = inject(JwtTokenService);


  public login(request: LoginCredentialsRequest) {
    return this.httpClient.post(`${HttpConfigService.AUTH_PATH}/login`, request)
  }

  public signup(request: SignUpCredentialsRequest) {
    return this.httpClient.post(`${HttpConfigService.AUTH_PATH}/sign-up`, request)
  }

  public logout() {
    localStorage.removeItem(JwtTokenService.TOKEN_NAME);
    this.router.navigate(['login']).then();
  }

  get baseHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.jwtTokenService.jwtToken}`);
  }
}
