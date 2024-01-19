import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', loadChildren: () => import("./shop/shop.module").then(m => m.ShopModule) },
  { path: 'basket', loadChildren: () => import("./basket/basket.module").then(m => m.BasketModule) },
  {
    path: 'checkout',
    loadChildren: () => import("./checkout/checkout.module").then(m => m.CheckoutModule),
    canActivate: [authGuard]
  },
  { path: 'account', loadChildren: () => import("./account/account.module").then(m => m.AccountModule) },
  { path: 'contact', component: ContactComponent },
  { path: "**", redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
