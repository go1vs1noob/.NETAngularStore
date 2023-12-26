import { Component } from '@angular/core';
import { Identifiable } from 'src/app/shared/interfaces/identifieable';
import { ProductsService } from 'src/app/shared/services/products.service';
import { SortOptions } from '../SortOptions';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.sass']
})
export class ShopHomeComponent {

  productTypeData: Identifiable[] = [{ id: 0, name: "All" }];
  productBrandData: Identifiable[] = [{ id: 0, name: "All" }];
  sortOptions: Identifiable[] = SortOptions.OptionList;
  currentChosenTypeId = 0;
  currentChosenBrandId = 0;
  currentChosenSortOption: Identifiable = SortOptions.OptionList[0];

  /* INIT */
  constructor(private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.retrieveProductTypes();
    this.retrieveProductBrands();
  }
  /* ********* */

  /* EVENT HANDLERS */
  onCurrentChosenTypeIdChange(index: number) {
    this.currentChosenTypeId = index;
  }
  onCurrentChosenBrandIdChange(index: number) {
    this.currentChosenBrandId = index;
  }
  onCurrentChosenOptionChange(index: number) {
    this.currentChosenSortOption = SortOptions.OptionList[index];
  }
  /* ********* */

  /* HELPER METHODS */
  retrieveProductTypes() {
    this.productService.getProductTypes().subscribe({
      next: value => {
        this.productTypeData = [{ id: 0, name: "All" }].concat(value);
      },
      error: err => { console.error('Error retrieving product types: ' + err) }
    });
  }
  retrieveProductBrands() {
    this.productService.getProductBrands().subscribe({
      next: value => {
        this.productBrandData = [{ id: 0, name: "All" }].concat(value);
      },
      error: err => { console.error('Error retrieving product types: ' + err) }
    });
  }
}
