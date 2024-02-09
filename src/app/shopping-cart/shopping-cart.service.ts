import { EventEmitter } from "@angular/core";
import { Product } from "../product-list/product.model"

export class ShoppingCartService{
  shoppingItemRemoved = new EventEmitter<Product[]>();
  priceChanged = new EventEmitter<Product>();
  private shoppingItems: Product[] = [
    new Product(0,'Peanut Butter', 8, 3, 'Food', 'https://live.staticflickr.com/65535/49947617826_3642d7230c_b.jpg','Desc'),
    new Product(1,'Whey Protein', 15, 2, 'Supplements', 'https://thumbs.dreamstime.com/b/whey-protein-powder-measuring-scoop-whey-protein-powder-measuring-scoop-bodybuilding-nutrition-supplements-101085245.jpg','Desc')
  ]

  getShoppingItems(){
    return this.shoppingItems.slice();
  }

  increaseItemQuantity(item: Product) {
    item.quantity++;
  }

  decreaseItemQuantity(item: Product) {
    item.quantity--;
  }
  
  removeItem(id: number){
    const index = this.shoppingItems.findIndex(i => i.id === id);
    this.shoppingItems.splice(index, 1);
    this.shoppingItemRemoved.emit(this.shoppingItems.slice())
  }
}