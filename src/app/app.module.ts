import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShoppingCartEditComponent } from './shopping-cart/shopping-cart-edit/shopping-cart-edit.component';
import { ProductComponent } from './product-list/product/product.component';
import { ShoppingCartService } from './shared/shopping-cart.service';
import { BoldTextPipe } from './bold.text.pipe';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

const appRoutes: Routes =[
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent},
  { path: 'auth', component: AuthComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingCartComponent,
    ProductListComponent,
    ShoppingCartEditComponent,
    ProductComponent,
    BoldTextPipe,
    AuthComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
