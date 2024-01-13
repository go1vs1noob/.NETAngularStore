import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGroupComponent } from './list-group/list-group.component';
import { SelectComponent } from './select/select.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { TimesDirective } from '../directives/times.directive';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    ListGroupComponent,
    SelectComponent,
    CardComponent,
    PaginationComponent,
    OrderTotalsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    TimesDirective,
    RouterModule
  ],
  exports: [ListGroupComponent, SelectComponent, CardComponent, PaginationComponent, PaginationModule, OrderTotalsComponent]
})
export class SharedModule { }
