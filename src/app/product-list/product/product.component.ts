import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {

  product: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService){
    this.productService.productSelected.subscribe(
      (id: number) => alert('Id' + id)
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      const productWithId1 = this.productService.getProducts().find((product) => product.id === 1);
      console.log(productWithId1)
    });
  }

  onSelectedProduct(){
    this.productService.productSelected.emit(this.product);
  }
}
