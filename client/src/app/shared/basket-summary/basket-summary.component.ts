import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketItem } from 'src/app/basket/basket-item';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.sass']
})
export default class BasketSummaryComponent {
  @Output() addItem = new EventEmitter<BasketItem>();
  @Output() removeItem = new EventEmitter<{ id: string, quantity: number }>();
  @Input() isBasket = true;

  constructor(public basketService: BasketService) { }

  addBasketItem(item: BasketItem) {
    this.addItem.emit(item)
  }

  removeBasketItem(id: string, quantity = 1) {
    this.removeItem.emit({ id, quantity })
  }

}
