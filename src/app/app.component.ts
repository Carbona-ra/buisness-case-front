import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from './services/users/users.service';
import { UserJWT } from './entities/user.entity';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, RouterLink, AsyncPipe, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  private readonly authService = inject(AuthService)
  private readonly usersService = inject(UsersService)
  private readonly router = inject(Router)
  
  isAuthenticated$:Observable<boolean> = this.authService.selectIsAuthenticated();
  userJWT$:Observable<UserJWT> = this.usersService.selectUserJWT();

  logout(){
    this.authService.logout();
  }

  isLoginPage(): boolean {
    const currentUrl = this.router.url.split('?')[0].split('#')[0];    
    return currentUrl === '/connexion'; 
  }

}
