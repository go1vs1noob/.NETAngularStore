import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopHomeComponent } from './shop-home/shop-home.component';

const routes: Routes = [
  { path: '', component: ShopHomeComponent },
  { path: ':id', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
