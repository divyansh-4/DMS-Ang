import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

interface User {
  pic:string;
  username: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule,ButtonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser(): void {
    const userId = localStorage.getItem('id');
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    this.http.get<User>(`http://localhost:3000/profile/${userId}`).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  navigateToOrders(): void {
    const userId = localStorage.getItem('id');
    if (!userId) {
      console.error('User not logged in');
      return;
    }
    this.router.navigate(['/order']);
  }
  onSubmit2() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/cart']);
      console.log('Viewing Cart');
    } else {
      console.log('not logged in');
    }
  }

  logout() {
    if (this.authService.logout()) {
      this.router.navigate(['/login']);
      console.log('logged out');
    } else {
      console.log('logout failed');
    }
  }

  goHome() {
    if (localStorage.getItem('token')) {
      this.authService.login(true);
      this.router.navigate(['/']);
    }
  }
}
