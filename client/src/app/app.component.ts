import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(private readonly basketService: BasketService, private readonly accountService: AccountService) {

  }
  ngOnInit(): void {
    this.getBasketFromLocalStorage();
    this.loadCurrentUserFromLocalStorage();
  }
  private getBasketFromLocalStorage() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId);
    }
  }
  private loadCurrentUserFromLocalStorage() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe();


  }


}
