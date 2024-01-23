import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  rootUrl = "/api/";
  constructor(private readonly httpClient: HttpClient) { }

  getOrders() {
    return this.httpClient.get<Order[]>(this.rootUrl + 'orders');
  }
  getOrderById(id: number) {
    return this.httpClient.get<Order>(this.rootUrl + `orders/${id}`);
  }
}
