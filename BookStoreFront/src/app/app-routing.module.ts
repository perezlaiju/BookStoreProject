import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './admin/categoriesCRUD/add-categories/add-categories.component';
import { ListCategoriesComponent } from './admin/categoriesCRUD/list-categories/list-categories.component';
import { UpdtCategoriesComponent } from './admin/categoriesCRUD/updt-categories/updt-categories.component';
import { AddCouponComponent } from './admin/couponCRUD/add-coupon/add-coupon.component';
import { ListCouponComponent } from './admin/couponCRUD/list-coupon/list-coupon.component';
import { UpdtCouponComponent } from './admin/couponCRUD/updt-coupon/updt-coupon.component';
import { BookpageComponent } from './bookpage/bookpage.component';
import { AddBooksComponent } from './admin/booksCRUD/add-books/add-books.component';
import { ListBooksComponent } from './admin/booksCRUD/list-books/list-books.component';
import { UpdtBooksComponent } from './admin/booksCRUD/updt-books/updt-books.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'home' ,component: BookpageComponent},
  {path:'login' ,component: LoginComponent},
  {path:'register' ,component: RegisterComponent},
  {path:'bookcrud' ,component: ListBooksComponent},
  {path:'bookcrud/addBook' , component:AddBooksComponent},
  {path:'bookcrud/updateBook/:id' , component:UpdtBooksComponent},
  {path:'categoriescrud' ,component: ListCategoriesComponent},
  {path:'categoriescrud/addCategory' , component:AddCategoriesComponent},
  {path:'categoriescrud/updateCategory/:id' , component:UpdtCategoriesComponent},
  {path:'couponcrud' ,component: ListCouponComponent},
  {path:'couponcrud/addCoupon' , component:AddCouponComponent},
  {path:'couponcrud/updateCoupon/:id' , component:UpdtCouponComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
