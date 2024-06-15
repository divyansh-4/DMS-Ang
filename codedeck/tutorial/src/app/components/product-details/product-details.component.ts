// src/app/components/product-details/product-details.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product, Products } from '../../../types';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone:true,
  imports:[RatingModule,FormsModule,CommonModule,ButtonModule,ConfirmPopupModule]
})
export class ProductDetailsComponent implements OnInit {
  @Input() product!:Product; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log(id);
      this.productService.getProductById(`http://localhost:3000/clothes/${id}`).subscribe(data => {
        this.product = data;
      });
    }
  }
}
