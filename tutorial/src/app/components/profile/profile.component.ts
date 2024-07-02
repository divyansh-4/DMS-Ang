import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

interface User {
  pic: string;
  username: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
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
    this.router.navigate(['/order']);
  }

  onSubmit2(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/cart']);
      console.log('Viewing Cart');
    } else {
      console.log('Not logged in');
    }
  }

  logout(): void {
    if (this.authService.logout()) {
      this.router.navigate(['/login']);
      console.log('Logged out');
    } else {
      console.log('Logout failed');
    }
  }

  goHome(): void {
    if (localStorage.getItem('token')) {
      this.authService.login(true);
      this.router.navigate(['/']);
    }
  }
}
