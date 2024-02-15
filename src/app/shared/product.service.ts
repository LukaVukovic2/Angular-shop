import { HttpClient } from "@angular/common/http";
import { Product } from "../product-list/product.model";
import { Injectable, OnInit } from "@angular/core";
import { Subject, map, take } from "rxjs";

@Injectable({providedIn: "root"})

export class ProductService{

  productsChanged = new Subject<Product[]>

  constructor(private http: HttpClient){}

  private products: Product[] = [
  ];

  getProducts() {
    return this.http.get<Product[]>('https://angular-webshop-7ade4-default-rtdb.europe-west1.firebasedatabase.app/products.json').pipe(take(1)); 
  }
}