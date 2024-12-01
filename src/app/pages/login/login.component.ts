import { Component, inject } from '@angular/core';
import { LoginFormComponent, LoginFormContent } from "../../components/login-form/login-form.component";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  errMsg?: string

  async onSubmitLogin(creds: LoginFormContent): Promise<void>{    
    try {
      await this.authService.login(creds.username, creds.password, creds.stayConnected)
      this.router.navigateByUrl('/')
    } catch (e: unknown) {
      this.errMsg = typeof e === 'string' ? e : 'An error occurred'   // ou e as string
    }
  }
}