import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login(isSuccessful: boolean): boolean {
    if (isSuccessful) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    return this.isAuthenticated;
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    console.log('logged out');
    this.isAuthenticated = false;
    return true;
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }
}
