import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {CartComponent} from './cart/cart/cart.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from './navbar/navbar.component';
import {MainPageComponent} from './main-page/main-page.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
//TODO
// implement status in the BE for cart
// implement a different model for displaying items and also give the ids away so you can use them
// get this to git
// make count actually work
// create an inner cart that will manage the items inside basically when you add to cart first the item gets added to the inner cart then updates the db one
// cart from db should have an id (orderLines don't matter)
// make login have error checks
// set the min to 1 for count
// when clicking the user you access the user menu where you can self delete or update your name


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    NavbarComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatPaginator,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
