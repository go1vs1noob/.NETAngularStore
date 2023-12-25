import { Component } from '@angular/core';
import { ProductType } from 'src/app/shared/product-type';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.sass']
})
export class ShopHomeComponent {
  data: ProductType[] | null = null;
  constructor(private productService: ProductsService) {
  }
  
  ngOnInit(): void {
    this.retrieveProductTypes();
  }

  retrieveProductTypes() {
    this.productService.getProductTypes().subscribe({
      next: value => {
        console.log(value);
        this.data = value;
      },
      error: err => { console.error('Error retrieving product types: ' + err) }
    });
  }
}
