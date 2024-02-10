import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../product-list/product.model';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shared/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private addedToCartSubscription: Subscription;
  quantityChangedSubscription: Subscription;
  itemCount: number;

  constructor(private shoppingCartService: ShoppingCartService){}
  ngOnInit() {
    this.addedToCartSubscription = this.shoppingCartService.addedToCart.subscribe(() =>{
      this.itemCount = this.shoppingCartService.getTotalQuantity();
    })
    this.quantityChangedSubscription = this.shoppingCartService.quantityChanged.subscribe((item: Product)=>{
      this.itemCount = this.shoppingCartService.getTotalQuantity();
    })
  }

  ngOnDestroy(){
    this.addedToCartSubscription.unsubscribe();
  }

  
}
