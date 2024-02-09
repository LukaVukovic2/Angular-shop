import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../product-list/product.model';
import { ShoppingCartService } from './shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})

export class ShoppingCartComponent implements OnInit, OnDestroy {
  items: Product[];
  private shoppingItemRemovedSubscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService){}

  ngOnInit(){
    this.items = this.shoppingCartService.getShoppingItems();
    this.shoppingItemRemovedSubscription = this.shoppingCartService.shoppingItemRemoved.subscribe((updatedItems: Product[]) => {
      console.log("Items updated:", updatedItems);
      this.items = updatedItems;
    });
  }
  

  ngOnDestroy() {
    this.shoppingItemRemovedSubscription.unsubscribe();
  }

  increaseQuantity(item: Product) {
    this.shoppingCartService.increaseItemQuantity(item);
  }

  decreaseQuantity(item: Product) {
    if(item.quantity > 1){
      this.shoppingCartService.decreaseItemQuantity(item);
    } else if(item.quantity === 1){
      this.shoppingCartService.removeItem(item.id);
    }
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.quantity * item.price), 0);
  }
  
}
