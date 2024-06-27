import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface CartProduct {
  prodId: number;
  userId: number;
  name: string;
  image: string;
  price: number;
  rating: string;
  info: string;
  qty: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCartProducts();
  }

  onSubmit() {
    if (this.authService.logout()) {
      this.router.navigate(['/login']);
      console.log('logged out');
    } else {
      console.log('logout failed');
    }
  }

  onSubmit2() {
    console.log("Checking out");
  }

  fetchCartProducts(): void {
    const userId = localStorage.getItem('id');
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    this.http
      .get<CartProduct[]>(`http://localhost:3000/getCartProducts/${userId}`)
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
