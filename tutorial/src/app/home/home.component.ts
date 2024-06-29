import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private productService: ProductsService,
    private router: Router,
    private authService: AuthService
  ) {}
  products: Product[] = [];
  totalRecords: number = 0;
  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;
  rows: number = 5;

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
    info: '',
  };
  onSubmit() {
    if (this.authService.logout()) {
      this.router.navigate(['/login']);
      console.log('logged out');
    } else {
      console.log('logout failed');
    }
  }
  onSubmit2() {
    // console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      this.router.navigate(['/cart']);
      console.log('Viewing Cart');
    } else {
      console.log('not logged in');
    }
  }
  navigateToOrders() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/order']);
      console.log('Viewing Cart');
    } else {
      console.log('not logged in');
    }
  }

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }
  toggleDeletePopup(product: Product) {}
  selectedProd(product: Product) {
    this.router.navigate(['/clothes', product.id]); // Navigate to the product detail page
  }
  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  onConfirmEdit(product: Product) {
    this.editProduct(product, this.selectedProduct.id ?? 0);
    this.displayEditPopup = false;
  }
  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productService
      .getProducts('http://localhost:3000/clothes', {
        page: page,
        perPage: perPage,
      })
      .subscribe({
        next: (products: Products) => {
          this.products = products.items;
          this.totalRecords = products.total;
        },
        error: (error) => console.log(error),
      });
  }

  editProduct(product: Product, id: number) {
    // console.log(product,"Edit");
    this.productService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => console.log(error),
      });
  }

  deleteProduct(id: number) {
    this.productService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => console.log(error),
      });
  }

  addProduct(product: Product) {
    this.productService
      .addProduct('http://localhost:3000/clothes/', product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => console.log(error),
      });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
