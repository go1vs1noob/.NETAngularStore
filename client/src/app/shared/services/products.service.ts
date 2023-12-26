import { Identifiable } from './../interfaces/identifieable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



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
}
