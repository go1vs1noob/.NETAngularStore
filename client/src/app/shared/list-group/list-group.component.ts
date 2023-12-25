import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductType } from '../product-type';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.sass']
})
export class ListGroupComponent {
  @Input() data: ProductType[] | null = null;
  currentChosenItemId = -1;
  

}
