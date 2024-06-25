// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';
//   errorMessage: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   login() {
//     if (this.authService.login(this.username, this.password)) {
//       this.router.navigate(['/']);
//     } else {
//       this.errorMessage = 'Invalid credentials';
//     }
//   }
// }
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  // onSubmit() {
  //   if (localStorage.getItem('token')) {
  //     console.log('removing previous');
  //     localStorage.removeItem('token');
  //   }
  //   this.http
  //     .post('http://localhost:3000/login', {
  //       username: this.username,
  //       password: this.password,
  //     })
  //     .subscribe(
  //       (response: any) => {
  //         localStorage.setItem('token', response.token);
  //         // this.router.navigate(['']);
  //         console.log('Login');
  //       },
  //       (error) => {
  //         this.errorMessage = 'Invalid username or password';
  //       }
  //     );
  //   if (this.authService.login()) {
  //     this.router.navigate(['/']);
  //   } else {
  //     console.log('Invalid credentials');
  //     this.errorMessage = 'Invalid credentials';
  //   }
  // }
  onSubmit() {
    if (localStorage.getItem('token')) {
      console.log('removing previous');
      localStorage.removeItem('token');
    }
    this.http
      .post('http://localhost:3000/login', {
        username: this.username,
        password: this.password,
      })
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          this.authService.login(true);
          this.router.navigate(['/']);
        },
        (error) => {
          this.errorMessage = 'Invalid username or password';
          this.authService.login(false);
        }
      );
  }
}
