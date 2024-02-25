import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product-list/product.model';
import { ProductService } from '../shared/product.service';
import { Subscription, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static:false}) form: NgForm;
  products: Product[] = [];
  productsSub: Subscription;
  productSub: Subscription;
  newId: number = 0;
  userToken: string;

  selectedProduct: Product = {
    id: +"", 
    name: "", 
    price: +"", 
    quantity: 1, 
    category: "", 
    imagePath: "", 
    description: "" 
  };

  constructor(
    private productService: ProductService, 
    private http: HttpClient,
    private authService: AuthService
  ){}

  ngOnInit() {
    this.retrieveProducts();
    this.productsSub = this.productService.productsSubject.subscribe(products => {
      this.products = products;
      if(products.length > 0){
        const keys = Object.keys(products);
        const lastKey = keys[keys.length - 1];
        this.newId = +lastKey + 1;
      }
    });

    this.authService.user.subscribe(
      user =>{
        this.userToken = user.token;
      }
    ).unsubscribe();
  }

  ngOnDestroy() {
    if(this.productsSub){
      this.productsSub.unsubscribe();
    }
    if(this.productSub){
      this.productSub.unsubscribe();
    }
  }
  
  displayProductInfo(product: Product){
    this.selectedProduct = { ...product};
  }

  clearInputs(){
    this.form.reset();
  }

  addProduct(){
    if(this.products.length === 0){
      this.newId = 0;
    }
    this.selectedProduct.id = this.newId;
    this.http.post('https://angular-webshop-7ade4-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=' + this.userToken, this.selectedProduct).subscribe(
      resData =>{
        const newProduct = { ...this.selectedProduct };
        this.products.push(newProduct);
        this.productService.productsChanged.next(this.products);
        this.newId++;
        this.retrieveProducts();
        this.clearInputs();
      }
    );
  }

  deleteProduct(product: Product) {
    const productId = product.id;
    this.http.delete(`https://angular-webshop-7ade4-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json?auth=${this.userToken}`).subscribe(
      resData => {
        this.products = this.products.filter(p => p.id !== productId);
        this.productService.productsSubject.next([...this.products]);
        this.clearInputs();
      },
      error => {
        console.error(error);
      }
    );
  }

  updateProduct(product: Product) {
    const productId = product.id;
  
    const index = this.products.findIndex(p => p.id === productId);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...product };
      this.productService.productsSubject.next([...this.products]);
    } else {
      console.error(`Product with ID ${productId} not found.`);
      return;
    }
  
    this.http.put(`https://angular-webshop-7ade4-default-rtdb.europe-west1.firebasedatabase.app/products/${productId}.json?auth=${this.userToken}`, product)
      .subscribe();
  }

  retrieveProducts(){
    this.productService.fetchProducts().subscribe(
      res =>{
        this.products = res
      }
    );
  }
}
