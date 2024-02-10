import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../../shared/product.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {

  product: Product;
  id: number;

  constructor(private route: ActivatedRoute, private productService: ProductService){
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) =>{
          this.id = params['id'];
          this.product = this.productService.getProducts().find((product) => product.id == this.id);
        }
      )
  }

  onSelectedProduct(){
    this.productService.productSelected.emit(this.product);
  }
}
