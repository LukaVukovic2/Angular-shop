import { Component, OnInit, ElementRef, ViewChild, Renderer2, Input, OnDestroy } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../../shared/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingCartService } from '../../shared/shopping-cart.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit, OnDestroy {
  items: Product[];
  product: Product;
  id: number;
  routeParamsSub: Subscription;
  itemsRetrieved = false;

  @ViewChild('img', {static: false}) img: ElementRef;
  @ViewChild('modal', {static: false}) modal: ElementRef;
  @ViewChild('modalImg', {static: false}) modalImg: ElementRef;
  @ViewChild('captionText', {static: false}) captionText: ElementRef;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private renderer: Renderer2,
    private router: Router
    ){
  }

  ngOnInit() {
    if(this.itemsRetrieved){
      return;
    }
    this.routeParamsSub = this.productService.productsSubject
      .pipe(take(1)).
      subscribe(resData =>{
        this.items = resData;
        this.route.params.subscribe((params: Params) => {
          this.id = +params['id'];
          this.product = this.items.find(product => product.id === this.id);
        });
      })
    this.productService.fetchProducts()
      .pipe(take(1))
      .subscribe((resData: Product[]) => {
        this.items = resData;
        if (this.id) {
          this.product = this.items.find(product => product.id === this.id);
        }
      this.itemsRetrieved = true;
    });
  }

  ngOnDestroy() {
    if(this.routeParamsSub){
      this.routeParamsSub.unsubscribe();
    }
  }
  
  onAddToCart(item: Product){
    this.shoppingCartService.addToCart(item);
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
