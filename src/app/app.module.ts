import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product-list/product/product.component';
import { ShoppingCartService } from './shared/shopping-cart.service';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthGuard } from './auth/auth.guard';
import { FooterComponent } from './footer/footer.component';
import { TruncatePipe } from './shopping-cart/truncate.pipe';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './auth/admin.guard';

const appRoutes: Routes =[
  { path: '', redirectTo: "products", pathMatch: 'full'},
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingCartComponent,
    ProductListComponent,
    ProductComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    FooterComponent,
    TruncatePipe,
    AdminDashboardComponent
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
