import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product, Products } from '../../../types';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private productService: ProductsService
  ) {}

  onSubmit() {
    const productId = this.route.snapshot.paramMap.get('id');
    const userId = localStorage.getItem('id');

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
          console.log('Product added to cart successfully');
          console.log(response);
        },
        (error) => {
          console.error('Error adding product to cart:', error);
          this.errorMessage = 'Error adding product to cart';
        }
      );
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService
        .getProductById(`http://localhost:3000/clothes/${id}`)
        .subscribe((data) => {
          this.product = data;
        });
    }
  }
}
