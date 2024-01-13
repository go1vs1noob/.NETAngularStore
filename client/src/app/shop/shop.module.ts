import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopHomeComponent } from './shop-home/shop-home.component';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    ShopHomeComponent,
    SearchComponent,
    ProductComponent

  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ShopModule { }
