import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartEditComponent } from './shopping-cart/shopping-cart-edit/shopping-cart-edit.component';
import { ProductComponent } from './product-list/product/product.component';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { ProductService } from './shared/product.service';
import { BoldTextPipe } from './bold.text.pipe';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes =[
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingCartComponent,
    ProductListComponent,
    ShoppingCartEditComponent,
    ProductComponent,
    BoldTextPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ShoppingCartService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
