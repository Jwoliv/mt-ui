import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {getBasePathUrl, getBasePathUrl2} from "../config/properties.config";
import {LoginCredentialsRequest, SignUpCredentialsRequest} from "../../model/auth.model";
import {JwtTokenService} from "../../utils/jwt-token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);
  private jwtTokenService: JwtTokenService = inject(JwtTokenService);


  public login(request: LoginCredentialsRequest) {
    return this.httpClient.post(`${getBasePathUrl2()}/auth/login`, request)
  }

  public signup(request: SignUpCredentialsRequest) {
    return this.httpClient.post(`${getBasePathUrl2()}/auth/sign-up`, request)
  }

  get baseHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.jwtTokenService.jwtToken}`);
  }
}
