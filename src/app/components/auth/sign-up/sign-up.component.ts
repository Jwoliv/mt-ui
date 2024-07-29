import {Component, DestroyRef, inject} from '@angular/core';
import {AuthFormComponent} from "../auth-form/auth-form.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/api/auth/auth.service";
import {SignUpCredentialsRequest} from "../../../model/api-model/auth.model";
import {JwtTokenService} from "../../../utils/jwt-token.service";
import {User} from "../../../model/api-model/user.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    AuthFormComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private authService: AuthService = inject(AuthService);
  private jwtTokenService: JwtTokenService = inject(JwtTokenService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  })


  onSignUp() {
    const subscription = this.authService.signup(this.form.value as SignUpCredentialsRequest).subscribe({
      next: response => this.jwtTokenService.save(response as User)
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
