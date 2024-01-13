import { Component } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.sass']
})
export class TopNavbarComponent {
  constructor(public readonly basketService: BasketService) {

  }
  foo(){
    this.basketService.basketSource$
  }
}
