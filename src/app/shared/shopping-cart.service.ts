import { EventEmitter } from "@angular/core";
import { Product } from "../product-list/product.model"

export class ShoppingCartService{
  shoppingItemRemoved = new EventEmitter<Product[]>();
  priceChanged = new EventEmitter<Product>();
  addedToCart = new EventEmitter<Product>();
  quantityChanged = new EventEmitter<Product>;

  private shoppingItems: Product[] = [
  ]

  getShoppingItems(){
    return this.shoppingItems.slice();
  }

  increaseItemQuantity(item: Product) {
    item.quantity++;
    this.quantityChanged.emit(item);
  }

  decreaseItemQuantity(item: Product) {
    item.quantity--;
    this.quantityChanged.emit(item);
  }
  
  removeItem(id: number){
    const index = this.shoppingItems.findIndex(item => item.id === id);
    this.shoppingItems.splice(index, 1);
    this.shoppingItemRemoved.emit(this.shoppingItems.slice());
    this.quantityChanged.emit();
  }

  addToCart(item: Product){
    const isAlreadyInCart = this.shoppingItems.some(product => product.id === item.id);
    if(isAlreadyInCart){
      item.quantity++;
    }
    else{
      this.shoppingItems.push(item);
      this.addedToCart.emit(item);
    }
    this.quantityChanged.emit();
  }

  getTotalQuantity(): number{
    if(this.shoppingItems.length > 0){
      return this.shoppingItems.reduce((total, item) => total + item.quantity, 0);
    }
  }

  finishOrder(){
    this.shoppingItems = [];
    alert('Thank you for Your order!');
    this.shoppingItemRemoved.emit(this.shoppingItems);
    this.quantityChanged.emit();
  }
}