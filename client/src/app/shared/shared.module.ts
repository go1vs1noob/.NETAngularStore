import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGroupComponent } from './list-group/list-group.component';
import { SelectComponent } from './select/select.component';



@NgModule({
  declarations: [
    ListGroupComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [ListGroupComponent, SelectComponent]
})
export class SharedModule { }
