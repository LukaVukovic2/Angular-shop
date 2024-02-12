import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../../shared/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingCartService } from '../../shared/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {
  product: Product;
  id: number;
  routeParamsSubscription: Subscription;

  @ViewChild('img', {static: false}) img: ElementRef;
  @ViewChild('modal', {static: false}) modal: ElementRef;
  @ViewChild('modalImg', {static: false}) modalImg: ElementRef;
  @ViewChild('captionText', {static: false}) captionText: ElementRef;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private renderer: Renderer2
    ){
  }

  ngOnInit() {
  this.route.params.subscribe((params: Params) => {
    this.id = +params['id'];
    this.productService.getProducts()
      .then((products: Product[]) => {
        this.product = products.find(product => product.id === this.id);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        // Handle error appropriately
      });
  });
}


  onAddToCart(item: Product){
    this.shoppingCartService.addToCart(item);
    console.log(this.img.nativeElement);
    alert("Added to Cart!");
  }

  onImgClick(){
    const doesContainClass = this.modal.nativeElement.classList.contains('closeModal')
    if(doesContainClass){
      this.renderer.removeClass(this.modal.nativeElement, 'closeModal')
    }
    this.renderer.addClass(this.modal.nativeElement, 'addModal');
    this.renderer.setProperty(this.modalImg.nativeElement, 'src', this.img.nativeElement.src);
    this.captionText.nativeElement.innerText = this.img.nativeElement.alt;
  }

  closeModal(){
    this.renderer.addClass(this.modal.nativeElement, 'closeModal');
    this.renderer.removeClass(this.modal.nativeElement, 'addModal');
  }
}
