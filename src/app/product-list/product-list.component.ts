import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: []
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  productsSub: Subscription;
  adminSub: Subscription;
  isAdmin = false;
  private filteredProductsSubject = new BehaviorSubject<Product[]>([]);
  filteredProducts$: Observable<Product[]> = this.filteredProductsSubject.asObservable();

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService
  ){}

  ngOnInit() {
    this.adminSub = this.authService.admin.subscribe(admin =>{
      this.isAdmin = !!admin
      if(this.isAdmin){
        this.router.navigate(['admin-dashboard']);
      }
    })
    this.productsSub = this.productService.productsSubject.subscribe(products => {
      this.products = products;
      this.filteredProductsSubject.next(products);
    });
    this.productService.getProducts();
  }

  ngOnDestroy() {
    if(this.productsSub){
      this.productsSub.unsubscribe();
    }
    if(this.adminSub){
      this.adminSub.unsubscribe();
    }
  }

  loadProduct(id: number){
    this.router.navigate([id], {relativeTo: this.route})
  }

  searchByKeyword(keyword: string){
    const filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
    this.filteredProductsSubject.next(filteredProducts.slice());
  }
}
