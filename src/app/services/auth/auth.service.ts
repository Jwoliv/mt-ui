import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {getBasePathUrl} from "../config/properties.config";
import {LoginCredentialsRequest, SignUpCredentialsRequest} from "../../model/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient: HttpClient = inject(HttpClient);

  public login(request: LoginCredentialsRequest) {
    console.log(request);
    return this.httpClient.post(`${getBasePathUrl()}/auth/login`, request)
  }


  public signup(request: SignUpCredentialsRequest) {
    return this.httpClient.post(`${getBasePathUrl()}/auth/sign-up`, request)
  }

}
