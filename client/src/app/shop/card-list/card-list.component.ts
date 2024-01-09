import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { CardInfo } from '../models/card-info';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.sass']
})
export class CardListComponent {
  @Input() data: CardInfo[] = [];
}
