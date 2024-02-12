import { Product } from "../product-list/product.model"
import { Subject } from "rxjs";

export class ShoppingCartService{
  shoppingItemRemoved = new Subject<Product[]>();
  priceChanged = new Subject<Product>();
  addedToCart = new Subject<Product>();
  quantityChanged = new Subject<Product>;

  private shoppingItems: Product[] = [
  ]

  getShoppingItems(){
    return this.shoppingItems.slice();
  }

  increaseItemQuantity(item: Product) {
    item.quantity++;
    this.quantityChanged.next(item);
  }

  decreaseItemQuantity(item: Product) {
    item.quantity--;
    this.quantityChanged.next(item);
  }
  
  removeItem(id: number){
    const index = this.shoppingItems.findIndex(item => item.id === id);
    this.shoppingItems.splice(index, 1);
    this.shoppingItemRemoved.next(this.shoppingItems.slice());
    this.quantityChanged.next(this.shoppingItems[index]);
  }

  addToCart(item: Product){
    const isAlreadyInCart = this.shoppingItems.some(product => product.id === item.id);
    if(isAlreadyInCart){
      item.quantity++;
    }
    else{
      this.shoppingItems.push(item);
      this.addedToCart.next(item);
    }
    this.quantityChanged.next(item);
  }

  getTotalQuantity(): number{
    if(this.shoppingItems.length > 0){
      return this.shoppingItems.reduce((total, item) => total + item.quantity, 0);
    }
  }

  finishOrder(){
    this.shoppingItems = [];
    alert('Thank you for Your order!');
    this.shoppingItemRemoved.next(this.shoppingItems);
    this.quantityChanged.next(this.shoppingItems[0]);
  }
}