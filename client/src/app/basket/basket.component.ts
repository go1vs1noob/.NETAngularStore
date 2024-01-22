import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketItem } from './basket-item';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent {
  constructor(public readonly basketService: BasketService) {

  }
  incrementQuantity(item: BasketItem) {
    this.basketService.addBasketItemToBasket(item);
  }
  decrementQuantity(id: string) {
    this.basketService.removeItemFromBasket(id);
  }
  removeItem(item: { id: string, quantity: number }) {
    this.basketService.removeItemFromBasket(item.id, item.quantity);
  }
}
