import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListGroupComponent } from './list-group/list-group.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ListGroupComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [ListGroupComponent]
})
export class SharedModule { }
