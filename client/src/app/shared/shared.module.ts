import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGroupComponent } from './list-group/list-group.component';
import { SelectComponent } from './select/select.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { TimesDirective } from '../directives/times.directive';
@NgModule({
  declarations: [
    ListGroupComponent,
    SelectComponent,
    CardComponent,
    PaginationComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    TimesDirective
  ],
  exports: [ListGroupComponent, SelectComponent, CardComponent, PaginationComponent, PaginationModule]
})
export class SharedModule { }
