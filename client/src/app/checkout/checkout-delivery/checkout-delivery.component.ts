import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { DeliveryMethod } from 'src/app/account/interfaces/deliveryMethod';
import { CheckoutService } from '../checkout.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.sass']
})
export class CheckoutDeliveryComponent implements OnInit {
  setShippingPrice(deliveryMethod: DeliveryMethod) {
     this.basketService.setShippingPrice(deliveryMethod);
  }
  @Input() checkoutForm?: FormGroup;

  deliveryMethods: DeliveryMethod[] = [];

  constructor(
    private accountService: AccountService,
    private readonly checkoutService: CheckoutService,
    private readonly basketService: BasketService) { }
  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (dm) => {
        console.log(dm);
        this.deliveryMethods = dm;
      }
    })
  }
  get deliveryForm() {
    return this.checkoutForm?.get('deliveryForm') as FormGroup;
  }

}
