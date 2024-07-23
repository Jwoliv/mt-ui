import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginCredentialsRequest} from "../../../model/auth.model";
import {AuthService} from "../../../services/auth/auth.service";
import {AuthFormComponent} from "../auth-form/auth-form.component";
import {User} from "../../../model/user.model";
import {JwtTokenService} from "../../../services/auth/jwt-token.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AuthFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private jwtTokenService: JwtTokenService = inject(JwtTokenService);

  public form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  })


  public onLogin() {
    this.authService.login(this.form.value as LoginCredentialsRequest)
      .subscribe({
        next: response => this.jwtTokenService.save(response as User)
      })
  }
}