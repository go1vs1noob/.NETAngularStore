import { Component } from '@angular/core';
import { Identifiable } from 'src/app/shared/interfaces/identifieable';
import { ProductsService } from 'src/app/shop/services/products.service';
import { SortOptions } from '../SortOptions';
import { Product } from '../models/product';
import { CardInfo } from '../models/card-info';
import { ShopQueryParams } from '../models/shop-query-params';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.sass']
})
export class ShopHomeComponent {



  productTypeData: Identifiable[] = [{ id: 0, name: "All" }];
  productBrandData: Identifiable[] = [{ id: 0, name: "All" }];
  productData: Product[] = [];
  shopQueryParams = new ShopQueryParams();
  sortOptions = SortOptions.OptionList;
  totalProductCount = 0;


  /* INIT */
  constructor(private productService: ProductsService) {
  }
  ngOnInit(): void {
    this.retrieveProductTypes();
    this.retrieveProductBrands();
    this.retrieveProducts(this.shopQueryParams);

  }
  /* ********* */

  /* EVENT HANDLERS */
  onCurrentChosenTypeIdChange(index: number) {
    this.shopQueryParams.typeId = index;
    this.shopQueryParams.pageNumber = 1;
    this.retrieveProducts(this.shopQueryParams);
  }
  onCurrentChosenBrandIdChange(index: number) {
    this.shopQueryParams.brandId = index;
    this.shopQueryParams.pageNumber = 1;
    this.retrieveProducts(this.shopQueryParams);

  }
  onCurrentChosenOptionChange(index: number) {
    this.shopQueryParams.sort = SortOptions.OptionList[index];
    this.shopQueryParams.pageNumber = 1;
    this.retrieveProducts(this.shopQueryParams);
  }
  onSearchStringChange(searchString: any) {
    this.shopQueryParams.searchString = searchString;
    this.shopQueryParams.pageNumber = 1;
    this.retrieveProducts(this.shopQueryParams);
  }
  onPageChanged(pageIndex: number) {
    this.shopQueryParams.pageNumber = pageIndex;

    this.retrieveProducts(this.shopQueryParams);
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
  retrieveProducts(shopQueryParams: ShopQueryParams) {
    this.productService.getProducts(shopQueryParams).subscribe({
      next: value => {
        this.productData = value?.data;
        this.shopQueryParams.pageSize = value.pageSize;
        this.shopQueryParams.pageNumber = value.pageIndex;
        this.totalProductCount = value.count;

      },
      error: err => { console.error('Error retrieving product types: ' + err) }
    });
  }
  transformProductDataToCardInfoData(productData: Product[]) {
    let cardData: CardInfo[] = [];
    cardData = productData.map(item => ({
      buttonLeftText: 'Buy',
      buttonRightText: 'View',
      cardImageSrc: item.pictureUrl,
      cardText: item.description,
      cardTitle: item.name
    }));
    return cardData;
  }
}
