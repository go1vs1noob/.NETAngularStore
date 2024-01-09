import { Identifiable } from '../../shared/interfaces/identifieable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';
import { Pagination } from '../models/pagination';
import { ShopQueryParams } from '../models/shop-query-params';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  rootUrl = "/api/"

  constructor(private httpClient: HttpClient) { }

  getProductTypes(): Observable<Identifiable[]> {
    return this.httpClient.get<Identifiable[]>(this.rootUrl + "Products/types");
  }

  getProductBrands(): Observable<Identifiable[]> {
    return this.httpClient.get<Identifiable[]>(this.rootUrl + "Products/brands");
  }
  getProducts(shopQueryParams: ShopQueryParams): Observable<Pagination<Product>> {
    let params = new HttpParams();
    if (shopQueryParams.brandId > 0) {
      params = params.append('brandId', shopQueryParams.brandId);
    }
    if (shopQueryParams.typeId) {
      params = params.append('typeId', shopQueryParams.typeId);
    }
    if (shopQueryParams.sort) {
      params = params.append('sort', shopQueryParams.sort.value);
    }
    if (shopQueryParams.searchString) {
      params = params.append('search', shopQueryParams.searchString);
    }
    if (shopQueryParams.pageNumber > 1) {
      params = params.append('pageIndex', shopQueryParams.pageNumber);

    }
    return this.httpClient.get<Pagination<Product>>(this.rootUrl + "Products", { params: params }).pipe(
      map(p => p)
    );
  }
}
