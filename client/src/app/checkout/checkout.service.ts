import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeliveryMethod } from '../account/interfaces/deliveryMethod';
import { map } from 'rxjs';
import { OrderToCreate } from '../shared/interfaces/order-to-create';
import { Order } from '../shared/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  rootUrl = "/api/";
  constructor(private httpClient: HttpClient) { }
  getDeliveryMethods() {
    return this.httpClient.get<DeliveryMethod[]>(this.rootUrl + 'orders/deliveryMethods').pipe(
      map(dm => {
        return dm.sort((a, b) => b.price - a.price);
      })
    )
  }
  createOrder(order: OrderToCreate) {
    return this.httpClient.post<Order>(this.rootUrl + 'orders', order);
  }
}
