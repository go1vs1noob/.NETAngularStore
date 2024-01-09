import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopHomeComponent } from './shop-home/shop-home.component';
import { SharedModule } from '../shared/shared.module';
import { CardListComponent } from './card-list/card-list.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShopHomeComponent,
    CardListComponent,
    SearchComponent

  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ShopModule { }
