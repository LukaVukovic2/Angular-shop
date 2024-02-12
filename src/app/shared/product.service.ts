import { HttpClient } from "@angular/common/http";
import { Product } from "../product-list/product.model";
import { Injectable, OnInit } from "@angular/core";

@Injectable({providedIn: "root"})

export class ProductService{

  constructor(private http: HttpClient){}

  private products: Product[] = [
  ];

  getProducts(): Promise<Product[]> {
    return this.http.get<Product[]>('https://angular-webshop-7ade4-default-rtdb.europe-west1.firebasedatabase.app/products.json')
      .toPromise()
      .then((resData: Product[]) => {
        this.products = resData
        return this.products;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        throw error; // Rethrow the error so it can be caught by the caller
      });
  }
}