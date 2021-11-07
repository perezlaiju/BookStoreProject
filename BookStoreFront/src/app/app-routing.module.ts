import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookpageComponent } from './bookpage/bookpage.component';
import { AddBooksComponent } from './booksCRUD/add-books/add-books.component';
import { ListBooksComponent } from './booksCRUD/list-books/list-books.component';
import { UpdtBooksComponent } from './booksCRUD/updt-books/updt-books.component';
import { TopmenuComponent } from './topmenu/topmenu.component';

const routes: Routes = [
  {path:'home' ,component: BookpageComponent},
  {path:'bookcrud' ,component: ListBooksComponent},
  {path:'bookcrud/addBook' , component:AddBooksComponent},
  {path:'bookcrud/updateBook/:id' , component:UpdtBooksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
