import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { Basket } from 'src/app/basket/basket';
import { Address } from 'src/app/account/interfaces/address';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.sass']
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm?: FormGroup;
  constructor(
    private readonly basketService: BasketService,
    private readonly checkoutService: CheckoutService,
    private readonly router: Router,

  ) { }
  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) {
      console.log("No basket");

      return;
    }
    const orderToCreate = this.getOrderToCreate(basket);
    if (!orderToCreate) {
      console.log("No order to create");
      return;
    }
    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: order => {
        console.log("Order created successfuly");
        this.basketService.deleteLocalBasket();
        const navigationExtras: NavigationExtras = { state: order };
        this.router.navigate(['checkout/success'], navigationExtras);
      }
    });
  }
  private getOrderToCreate(basket: Basket) {


    const deliveryMethodId = this.deliveryForm?.get('deliveryMethod')?.value;
    const shipToAddress = this.addressForm?.value as Address;

    if (!deliveryMethodId || !shipToAddress) {

      return;
    }
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    };


  }
  get deliveryForm() {
    return this.checkoutForm?.get('deliveryForm') as FormGroup;
  }
  get addressForm() {
    return this.checkoutForm?.get('addressForm') as FormGroup;
  }
}
