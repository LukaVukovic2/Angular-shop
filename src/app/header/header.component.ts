import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../product-list/product.model';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private addedToCartSub: Subscription;
  private quantityChangedSub: Subscription;
  private authSub: Subscription;
  private adminSub: Subscription;
  isAuthenticated = false;
  isAdmin = false;
  itemCount: number;

  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService){}
  ngOnInit() {
    this.addedToCartSub = this.shoppingCartService.addedToCart.subscribe(() =>{
      this.itemCount = this.shoppingCartService.getTotalQuantity();
    })
    this.quantityChangedSub = this.shoppingCartService.quantityChanged.subscribe((item: Product)=>{
      this.itemCount = this.shoppingCartService.getTotalQuantity();
    })
    this.authSub = this.authService.user.subscribe(
      user =>{
        this.isAuthenticated = !!user;
      }
    );
    this.adminSub = this.authService.admin.subscribe(
      admin =>{
        this.isAdmin = !!admin;
      }
    )
  }

  ngOnDestroy(){
    if(this.addedToCartSub){
      this.addedToCartSub.unsubscribe();
    }
    if(this.quantityChangedSub){
      this.quantityChangedSub.unsubscribe();
    }
    if(this.authSub){
      this.authSub.unsubscribe();
    }
    if(this.adminSub){
      this.adminSub.unsubscribe();
    }
  }

  onLogout(){
    this.authService.logoutUser();
  }
  
  toggleNavbar() {
    const navbarCollapse = document.getElementById('nav');
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }
}
