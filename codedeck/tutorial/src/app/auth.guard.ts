import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getAuthStatus()) {
      console.log("Got true")
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log("Login failed");
      return false;
    }
  }
}
