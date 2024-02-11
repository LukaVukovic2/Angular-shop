import { Component, OnInit, Input, EventEmitter, OnDestroy } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../../shared/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingCartService } from '../../shared/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {
  product: Product;
  id: number;
  routeParamsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ){
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) =>{
          this.id = params['id'];
          this.product = this.productService.getProducts().find((product) => product.id == this.id);
        }
      )
  }


  onAddToCart(item: Product){
    this.shoppingCartService.addToCart(item);
    alert("Added to Cart!");
  }
}
