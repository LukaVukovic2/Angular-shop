import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../product-list/product.model';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})

export class ShoppingCartComponent implements OnInit, OnDestroy {
  items: Product[];
  private shoppingItemRemovedSub: Subscription;
  private addedToCartSub: Subscription;

  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService){}

  ngOnInit(){
    this.items = this.shoppingCartService.getShoppingItems();
    this.shoppingItemRemovedSub = this.shoppingCartService.shoppingItemRemoved.subscribe(updatedItems => {
      this.items = updatedItems;
    });
    this.addedToCartSub = this.shoppingCartService.addedToCart.subscribe(addedItem =>{
      this.items.push(addedItem);
    })
  }
  

  ngOnDestroy() {
    if(this.shoppingItemRemovedSub){
      this.shoppingItemRemovedSub.unsubscribe();
    }
    if(this.addedToCartSub){
      this.addedToCartSub.unsubscribe();
    }
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

  onConfirmOrder(){
    this.shoppingCartService.confirmOrder();
  }
}
