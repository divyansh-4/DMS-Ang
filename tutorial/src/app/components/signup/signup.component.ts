import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http
      .post(
        'http://localhost:3000/signup',
        {
          username: this.username,
          password: this.password,
          email: this.email,
        },
        { responseType: 'text' }
      ) // Add responseType: 'text' here
      .subscribe(
        (response: any) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          this.errorMessage = 'Error signing up';
        }
      );
  }
}
