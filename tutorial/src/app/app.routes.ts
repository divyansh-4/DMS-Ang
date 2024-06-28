import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  {
    path: 'clothes/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
  },
];
