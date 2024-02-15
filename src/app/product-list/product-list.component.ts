import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: []
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  productsSub: Subscription;

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private route: ActivatedRoute
    ){}

  ngOnInit(){
    this.productsSub = this.productService.getProducts().subscribe((resData: Product[]) => {
      this.products = resData
      console.log(this.products);
    })
  }

  ngOnDestroy() {
    if(this.productsSub){
      this.productsSub.unsubscribe();
    }
  }

  loadProduct(id: number){
    this.router.navigate([id], {relativeTo: this.route})
  }
}
