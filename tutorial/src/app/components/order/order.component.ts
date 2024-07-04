import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

interface OrderProduct {
  orderId: number;
  userId: number;
  name: string;
  image: string;
  price: number;
  rating: string;
  info: string;
  qty: number;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  imports: [CommonModule, FormsModule, CommonModule, ButtonModule],
  standalone: true,
})
export class OrderComponent implements OnInit {
  cartProducts: OrderProduct[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchOrderProducts();
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
    if (sessionStorage.getItem('token')) {
      this.authService.login(true);
      this.router.navigate(['/']);
    }
  }
  onSubmit2() {
    // console.log(sessionStorage.getItem('token'));
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['/cart']);
      console.log('Viewing Cart');
    } else {
      console.log('not logged in');
    }
  }
  checkout() {
    // console.log("NOT HERE !");
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['/cart']);
      console.log('Viewing Cart');
    } else {
      console.log('not logged in');
    }
  }

  fetchOrderProducts(): void {
    const userId = sessionStorage.getItem('id');
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    this.http
      .get<OrderProduct[]>(`http://localhost:3000/getOrderProducts/${userId}`)
      .subscribe(
        (data) => {
          this.cartProducts = data;
        },
        (error) => {
          console.error('Error fetching cart products:', error);
        }
      );
  }
}
