import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket, BasketTotal } from './basket';
import { BasketItem } from './basket-item';
import { Product } from '../shop/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  rootUrl = "/api/";
  private _basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this._basketSource.asObservable();
  private _basketTotalSource = new BehaviorSubject<BasketTotal | null>(null);
  basketTotalSource$ = this._basketTotalSource.asObservable();
  constructor(private httpClient: HttpClient) { }
  getBasket(id: string) {
    return this.httpClient.get<Basket>(this.rootUrl + 'basket?id=' + id).subscribe({
      next: basket => {
        this._basketSource.next(basket);
        this.calculateTotal();
      }
    })
  }
  setBasket(basket: Basket) {
    return this.httpClient.post<Basket>(this.rootUrl + 'basket', basket).subscribe({
      next: basket => {
        this._basketSource.next(basket);
        this.calculateTotal();
      }
    })
  }
  getCurrentBasketValue() {
    return this._basketSource.value;
  }
  addBasketItemToBasket(basketItemToAdd: BasketItem, quantityToAdd = 1) {
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, basketItemToAdd, quantityToAdd);
    this.setBasket(basket);
  }
  addProductToBasket(productToAdd: Product, quantityToAdd = 1) {
    const basketItemToAdd = this.productToBasketItem(productToAdd);
    this.addBasketItemToBasket(basketItemToAdd, quantityToAdd);
  }
  removeItemFromBasket(id: string, quantity = 1) {
    const basket = this.getCurrentBasketValue();
    if (!basket) {
      return;
    }
    const item = basket.items.find(x => x.id === id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        basket.items = basket.items.filter(x => x.id !== id);
        this.setBasket(basket);
      }
      else if (item.quantity > 0) {
        this.setBasket(basket);
      }
      else {
        this.deleteBasket(basket);
      }
    }
  }
  private deleteBasket(basket: Basket) {
    return this.httpClient.delete(this.rootUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this._basketSource.next(null);
        this._basketTotalSource.next(null);
        localStorage.removeItem(basket.id);
      }
    })
  }
  private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantityToAdd = 1): BasketItem[] {
    let item = items.find(x => x.id === itemToAdd.id);
    if (item) {
      item.quantity += quantityToAdd;
    }
    else {
      itemToAdd.quantity = quantityToAdd;
      items.push(itemToAdd);
    }
    return items;
  }
  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  private productToBasketItem(product: Product): BasketItem {
    return {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      pictureUrl: product.pictureUrl,
      brand: product.productBrand,
      type: product.productType
    };
  }
  private calculateTotal() {
    const basket = this.getCurrentBasketValue();
    if (!basket) {
      return;
    }
    const shipping = 0;
    const subtotal = basket.items.reduce((prev, cur) => (cur.price * cur.quantity) + prev, 0);
    const total = shipping + subtotal;
    this._basketTotalSource.next({ shipping, subtotal, total });
  }

} 
