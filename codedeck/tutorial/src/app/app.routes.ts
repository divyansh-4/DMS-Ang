import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { 
    path: 'clothes/:id', 
    component: ProductDetailsComponent 
  },
];
