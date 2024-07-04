import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../../types';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    ConfirmPopupModule,
  ],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product!: Product;
  errorMessage: string | undefined;
  successMessage: string | undefined;
  cartQty: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private productService: ProductsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService
        .getProductById(`http://localhost:3000/clothes/${id}`)
        .subscribe((data) => {
          this.product = data;
          this.getCartQuantity();
        });
    }
  }

  getCartQuantity() {
    const userId = sessionStorage.getItem('id');
    const productId = this.route.snapshot.paramMap.get('id');

    if (userId && productId) {
      this.http
        .get<number>(
          `http://localhost:3000/cartQuantity?userId=${userId}&productId=${productId}`
        )
        .subscribe(
          (qty: number) => {
            this.cartQty = qty;
          },
          (error) => {
            console.error('Error fetching cart quantity:', error);
          }
        );
    }
  }

  onSubmit() {
    const productId = this.route.snapshot.paramMap.get('id');
    const userId = sessionStorage.getItem('id');

    if (!userId) {
      this.errorMessage = 'User not logged in';
      return;
    }

    if (!productId) {
      this.errorMessage = 'Product ID not found';
      return;
    }

    this.http
      .post(
        'http://localhost:3000/addCart',
        {
          userId: userId,
          productId: productId,
        },
        { responseType: 'text' }
      )
      .subscribe(
        (response: any) => {
          this.successMessage = 'Product added to cart successfully';
          this.getCartQuantity();
          setTimeout(() => {
            this.successMessage = undefined;
          }, 3000); // Hide message after 3 seconds
        },
        (error) => {
          console.error('Error adding product to cart:', error);
          this.errorMessage = 'Error adding product to cart';
        }
      );
  }

  removeFromCart() {
    const productId = this.route.snapshot.paramMap.get('id');
    const userId = sessionStorage.getItem('id');

    if (!userId) {
      this.errorMessage = 'User not logged in';
      return;
    }

    if (!productId) {
      this.errorMessage = 'Product ID not found';
      return;
    }

    this.http
      .post(
        'http://localhost:3000/removeCart',
        {
          userId: userId,
          productId: productId,
        },
        { responseType: 'text' }
      )
      .subscribe(
        (response: any) => {
          this.successMessage = 'Product removed from cart successfully';
          this.getCartQuantity();
          setTimeout(() => {
            this.successMessage = undefined;
          }, 3000); // Hide message after 3 seconds
        },
        (error) => {
          console.error('Error removing product from cart:', error);
          this.errorMessage = 'Error removing product from cart';
        }
      );
  }

  onSubmit2() {
    if (sessionStorage.getItem('token')) {
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
    if (sessionStorage.getItem('token')) {
      this.authService.login(true);
      this.router.navigate(['/']);
    }
  }

  navigateToOrders() {
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['/order']);
      console.log('Viewing Cart');
    } else {
      console.log('not logged in');
    }
  }
}
