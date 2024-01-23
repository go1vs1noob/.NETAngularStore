import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from 'src/app/shared/interfaces/order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.sass']
})
export class OrderDetailedComponent implements OnInit {
  order: Order | undefined;
  constructor(private readonly orderService: OrderService, private activateRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.initOrder();
  }
  initOrder() {
    const id = this.activateRoute.snapshot.params["id"];
    this.orderService.getOrderById(id).subscribe({
      next: value => {
        this.order = value;
      }
    })
  }
}
