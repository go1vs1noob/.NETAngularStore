import { Component } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.sass']
})
export class TopNavbarComponent {

  constructor(public readonly basketService: BasketService, public readonly accountService: AccountService) {

  }
  logOut() {
    this.accountService.logout();
  }

}
