import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  product: Product | null = null;
  quantity = 1;
  quantityInBasket = 0;
  constructor(private readonly productsService: ProductsService, private readonly route: ActivatedRoute, private readonly basketService: BasketService) {

  }
  ngOnInit(): void {
    this.fetchProduct();

  }
  private fetchProduct() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id === null) {
      return;
    }
    this.productsService.getProductById(id).subscribe({
      next: product => {
        this.product = product;
        this.basketService.basketSource$.pipe(take(1)).subscribe({
          next: basket => {
            const item = basket?.items.find(x => x.id.toString() === id.toString());
            if (item) {
              this.quantity = item.quantity;
              this.quantityInBasket = item.quantity;


            }
          }
        });
      },
      error: error => console.log(error)
    });
  }
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    this.quantity--;
  }
  updateBasket() {
    if (this.product) {
      if (this.quantity > this.quantityInBasket) {
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemsToAdd;
        this.basketService.addProductToBasket(this.product, itemsToAdd);
      }
      else {
        const itemsToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
      }
    }
  }
  get buttonText() {
    return this.quantityInBasket === 0 ? "Add to basket" : "Update basket";
  }

}
