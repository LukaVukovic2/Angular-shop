import { EventEmitter } from "@angular/core";
import { Product } from "./product.model";

export class ProductService{
  productSelected = new EventEmitter<Product>();

  private products: Product[] = [
    new Product(1,'Peanut Butter', 8, 'Food', 'Image Path','Desc'),
    new Product(2,'Whey Protein', 15, 'Supplements', 'Image Path', 'Desc'),
    new Product(3,'Peanut Butter', 8, 'Food', 'Image Path','Desc'),
    new Product(4,'Whey Protein', 15, 'Supplements', 'Image Path', 'Desc'),
    new Product(5,'Peanut Butter', 8, 'Food', 'Image Path','Desc'),
    new Product(6,'Whey Protein', 15, 'Supplements', 'Image Path', 'Desc'),
    new Product(7,'Peanut Butter', 8, 'Food', 'Image Path','Desc'),
    new Product(8,'Whey Protein', 15, 'Supplements', 'Image Path', 'Desc'),
    new Product(9,'Peanut Butter', 8, 'Food', 'Image Path','Desc'),
    new Product(10,'Whey Protein', 15, 'Supplements', 'Image Path', 'Desc'),
    new Product(11,'Peanut Butter', 8, 'Food', 'Image Path','Desc'),
    new Product(12,'Whey Protein', 15, 'Supplements', 'Image Path', 'Desc'),
  ];
  getProducts(){
    return this.products.slice();
  }
}