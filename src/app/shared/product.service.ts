import { EventEmitter } from "@angular/core";
import { Product } from "../product-list/product.model";

export class ProductService{
  productSelected = new EventEmitter<Product>();

  private products: Product[] = [
    new Product(1,'Peanut Butter', 8, 1, 'Food', 'https://live.staticflickr.com/65535/49947617826_3642d7230c_b.jpg','Desc'),
    new Product(2,'Whey Protein', 15, 1, 'Supplements', 'https://thumbs.dreamstime.com/b/whey-protein-powder-measuring-scoop-whey-protein-powder-measuring-scoop-bodybuilding-nutrition-supplements-101085245.jpg', 'Desc'),
    new Product(3,'Peanut Butter', 8, 1, 'Food', 'https://live.staticflickr.com/65535/49947617826_3642d7230c_b.jpg','Desc'),
    new Product(4,'Whey Protein', 15, 1, 'Supplements', 'https://thumbs.dreamstime.com/b/whey-protein-powder-measuring-scoop-whey-protein-powder-measuring-scoop-bodybuilding-nutrition-supplements-101085245.jpg', 'Desc'),
    new Product(5,'Peanut Butter', 8, 1, 'Food', 'https://live.staticflickr.com/65535/49947617826_3642d7230c_b.jpg','Desc'),
    new Product(6,'Whey Protein', 15, 1, 'Supplements', 'https://thumbs.dreamstime.com/b/whey-protein-powder-measuring-scoop-whey-protein-powder-measuring-scoop-bodybuilding-nutrition-supplements-101085245.jpg', 'Desc'),
    new Product(7,'Peanut Butter', 8, 1, 'Food', 'https://live.staticflickr.com/65535/49947617826_3642d7230c_b.jpg','Desc'),
    new Product(8,'Whey Protein', 15, 1, 'Supplements', 'https://thumbs.dreamstime.com/b/whey-protein-powder-measuring-scoop-whey-protein-powder-measuring-scoop-bodybuilding-nutrition-supplements-101085245.jpg', 'Desc'),
    new Product(9,'Peanut Butter', 8, 1, 'Food', 'https://live.staticflickr.com/65535/49947617826_3642d7230c_b.jpg','Desc'),
    new Product(10,'Whey Protein', 15, 1, 'Supplements', 'https://thumbs.dreamstime.com/b/whey-protein-powder-measuring-scoop-whey-protein-powder-measuring-scoop-bodybuilding-nutrition-supplements-101085245.jpg', 'Desc'),
    new Product(11,'Peanut Butter', 8, 1, 'Food', 'https://live.staticflickr.com/65535/49947617826_3642d7230c_b.jpg','Desc'),
    new Product(12,'Whey Protein', 15, 1, 'Supplements', 'https://thumbs.dreamstime.com/b/whey-protein-powder-measuring-scoop-whey-protein-powder-measuring-scoop-bodybuilding-nutrition-supplements-101085245.jpg', 'Desc'),
  ];
  getProducts(){
    return this.products.slice();
  }
}