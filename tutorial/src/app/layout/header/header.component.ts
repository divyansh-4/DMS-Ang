import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import { RouteReuseStrategy } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,CommonModule,ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    // private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  navigateToProfile(){
        if (localStorage.getItem('token')) {
          this.router.navigate(['/profile']);
        } else {
          console.log('not logged in');
        }
  }

}
  // onSubmit() {
  //   if (this.authService.logout()) {
  //     this.router.navigate(['/login']);
  //     console.log('logged out');
  //   } else {
  //     console.log('logout failed');
  //   }
  // }
  // onSubmit2() {
  //   console.log(localStorage.getItem('token'));
  //   // if (localStorage.getItem('token')) {
  //   //   this.router.navigate(['/cart']);
  //   //   console.log('Viewing Cart');
  //   // } else {
  //   //   console.log('not logged in');
  //   // }
  // }

