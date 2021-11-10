import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookpageComponent } from './bookpage/bookpage.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { ListBooksComponent } from './admin/booksCRUD/list-books/list-books.component';
import { AddBooksComponent } from './admin/booksCRUD/add-books/add-books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdtBooksComponent } from './admin/booksCRUD/updt-books/updt-books.component';
import { ListCategoriesComponent } from './admin/categoriesCRUD/list-categories/list-categories.component';
import { AddCategoriesComponent } from './admin/categoriesCRUD/add-categories/add-categories.component';
import { UpdtCategoriesComponent } from './admin/categoriesCRUD/updt-categories/updt-categories.component';
import { UpdtCouponComponent } from './admin/couponCRUD/updt-coupon/updt-coupon.component';
import { AddCouponComponent } from './admin/couponCRUD/add-coupon/add-coupon.component';
import { ListCouponComponent } from './admin/couponCRUD/list-coupon/list-coupon.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    BookpageComponent,
    TopmenuComponent,
    ListBooksComponent,
    AddBooksComponent,
    UpdtBooksComponent,
    ListCategoriesComponent,
    AddCategoriesComponent,
    UpdtCategoriesComponent,
    UpdtCouponComponent,
    AddCouponComponent,
    ListCouponComponent,
    LoginComponent,
    RegisterComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
