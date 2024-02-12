import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: []
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private route: ActivatedRoute
    ){}

  ngOnInit(){
    this.productService.getProducts()
      .then(products => {
        this.products = products;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }

  loadProduct(id: number){
    this.router.navigate([id], {relativeTo: this.route})
  }
}
