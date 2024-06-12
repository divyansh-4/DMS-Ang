import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    // {
    //     path:'home',
    //     component:HeaderComponent
    // }
];
