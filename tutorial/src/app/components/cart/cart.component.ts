// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';

// interface CartProduct {
//   prodId: number;
//   userId: number;
//   name: string;
//   image: string;
//   price: number;
//   rating: string;
//   info: string;
//   qty: number;
// }

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.scss'],
//   imports: [CommonModule],
//   standalone: true,
// })
// export class CartComponent implements OnInit {
//   cartProducts: CartProduct[] = [];

//   constructor(
//     private http: HttpClient,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.fetchCartProducts();
//   }

//   onSubmit3() {
//     // if (this.authService.logout()) {
//     //   this.router.navigate(['/login']);
//     //   console.log('logged out');
//     // } else {
//     //   console.log('logout failed');
//     // }
//     console.log("Logging out");
//   }

//   onSubmit() {
//     console.log("Checking out");
//   }

//   fetchCartProducts(): void {
//     const userId = localStorage.getItem('id');
//     if (!userId) {
//       console.error('User not logged in');
//       return;
//     }

//     this.http
//       .get<CartProduct[]>(`http://localhost:3000/getCartProducts/${userId}`)
//       .subscribe(
//         (data) => {
//           this.cartProducts = data;
//         },
//         (error) => {
//           console.error('Error fetching cart products:', error);
//         }
//       );
//   }
// }


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

  logout() {
    if (this.authService.logout()) {
      this.router.navigate(['/login']);
      console.log('logged out');
    } else {
      console.log('logout failed');
    }
  }

  checkout() {
    if (localStorage.getItem('token')) {
      console.log('Checking out');
      const userId = localStorage.getItem('id');
      if (!userId) {
        console.error('User not logged in');
        return;
      }

      // Log the userId to ensure it's being fetched
      console.log('User ID for checkout:', userId);

      this.http
        .post<{ message: string }>('http://localhost:3000/checkout', { userId })
        .subscribe(
          (response) => {
            console.log(response.message);
            this.cartProducts = [];
            this.router.navigate(['/order']); // Navigate to orders page or another relevant page
          },
          (error) => {
            console.error('Error placing order:', error);
          }
        );
    } else {
      console.log('not logged in');
      this.router.navigate(['/login']);
    }
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
