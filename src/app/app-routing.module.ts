import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
      }
    ]
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule),
      }
    ]
  },
  {
    path: 'product',
    children: [
      {
        path: '',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
      }
    ]
  },
  {
    path: 'account',
    children: [
      {
        path: '',
        loadChildren: () => import('./my-acount/my-acount.module').then(m => m.MyAcountModule)
      }
    ]
  },
  {
    path: 'checkout',
    children: [
      {
        path: '',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
      }
    ]
  },
  {
    path: 'account/orders',
    children: [
      {
        path: '',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
      }
    ],
  },
  {
    path: 'communication',
    children: [
      {
        path: '',
        loadChildren: () => import('./communication/communication.module').then(m => m.CommunicationModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
