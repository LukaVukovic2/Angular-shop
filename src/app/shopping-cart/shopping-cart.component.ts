import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../product-list/product.model';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})

export class ShoppingCartComponent implements OnInit, OnDestroy {
  items: Product[];
  private shoppingItemRemovedSubscription: Subscription;
  private addedToCartSubscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService){}

  ngOnInit(){
    this.items = this.shoppingCartService.getShoppingItems();
    this.shoppingItemRemovedSubscription = this.shoppingCartService.shoppingItemRemoved.subscribe((updatedItems: Product[]) => {
      this.items = updatedItems;
    });
    this.addedToCartSubscription = this.shoppingCartService.addedToCart.subscribe((addedItem: Product) =>{
      this.items.push(addedItem);
    })
  }
  

  ngOnDestroy() {
    this.shoppingItemRemovedSubscription.unsubscribe();
    this.addedToCartSubscription.unsubscribe();
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

  onFinishOrder(){
    this.shoppingCartService.finishOrder();
  }
}
