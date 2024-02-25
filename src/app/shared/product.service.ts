import { HttpClient } from "@angular/common/http";
import { Product } from "../product-list/product.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, map, take } from "rxjs";

@Injectable({providedIn: "root"})

export class ProductService{

  productsChanged = new Subject<Product[]>

  constructor(private http: HttpClient){}
  productsSubject = new BehaviorSubject<Product[]>([]);

  products: Product[] = [
  ];
  
  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://angular-webshop-7ade4-default-rtdb.europe-west1.firebasedatabase.app/products.json')
      .pipe(take(1),
      map(resData =>{
        const productArray = [];
        for(const key in resData){
          if(resData.hasOwnProperty(key)){
            productArray.push({ ...resData[key], id: key});
          }
        }
        this.productsSubject.next(productArray);
        return productArray;
      }
    ))
  }

  getProducts() {
    if (!this.productsSubject.value.length) {
      this.fetchProducts().subscribe();
    }
  }
}