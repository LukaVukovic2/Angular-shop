import { Product } from "../product-list/product.model"
export class ShoppingCartService{
  private shoppingItems: Product[] = [
    new Product(1,'Peanut Butter', 8, 'Food', 'Image Path','Desc')
  ]

  getShoppingItems(){
    return this.shoppingItems.slice();
  }
}