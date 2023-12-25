import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductType } from '../product-type';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  rootUrl = "/api/"
  constructor(private httpClient: HttpClient) { }
  getProductTypes(): Observable<ProductType[]> {
    return this.httpClient.get<ProductType[]>(this.rootUrl + "Products/types");
  }


}
