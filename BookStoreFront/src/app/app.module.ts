import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookpageComponent } from './bookpage/bookpage.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { ListBooksComponent } from './booksCRUD/list-books/list-books.component';
import { AddBooksComponent } from './booksCRUD/add-books/add-books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdtBooksComponent } from './booksCRUD/updt-books/updt-books.component';

@NgModule({
  declarations: [
    AppComponent,
    BookpageComponent,
    TopmenuComponent,
    ListBooksComponent,
    AddBooksComponent,
    UpdtBooksComponent,
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
