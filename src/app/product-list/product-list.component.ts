import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: []
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  productsSub: Subscription;
  adminSub: Subscription;
  isAdmin = false;

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
      else{
        
      }
    })
    this.productsSub = this.productService.productsSubject.subscribe(products => {
      this.products = products;
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
}
