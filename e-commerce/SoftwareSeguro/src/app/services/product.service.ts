import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: number = 0;
  productObs: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor() { }
  http = inject(HttpClient);

  getAllProducts(){
    return this.http.get<Product[]>(environment.apiUrl+"/product")
  }

  getProductbyId(id: string){
    return this.http.get<Product>(environment.apiUrl+"/product/" + id);
  }

  addProduct(model:Product){
    return this.http.post(environment.apiUrl + "/product", model);
  }

  updateProduct(id: string, model: Product){
    return this.http.put(environment.apiUrl + "/product/" + id, model)
  }

  deleteProduct(id: string){
    return this.http.delete(environment.apiUrl + "/product/" + id)
  }

  addCart(){
    this.products += 1;
    this.productObs.next(this.products);
  }

}
