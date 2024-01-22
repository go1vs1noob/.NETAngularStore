import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGroupComponent } from './list-group/list-group.component';
import { SelectComponent } from './select/select.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimesDirective } from '../directives/times.directive';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { RouterModule } from '@angular/router';
import { InputComponent } from './input/input.component';
import { StepperComponent } from './stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import BasketSummaryComponent from './basket-summary/basket-summary.component';
@NgModule({
  declarations: [
    ListGroupComponent,
    SelectComponent,
    CardComponent,
    PaginationComponent,
    OrderTotalsComponent,
    InputComponent,
    StepperComponent,
    BasketSummaryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    TimesDirective,
    RouterModule,
    ReactiveFormsModule,
    CdkStepperModule
  ],
  exports: [
    ListGroupComponent,
    SelectComponent,
    CardComponent,
    PaginationComponent,
    PaginationModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    InputComponent,
    StepperComponent,
    CdkStepperModule,
    BasketSummaryComponent
  ]
})
export class SharedModule { }
