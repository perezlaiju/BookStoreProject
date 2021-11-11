import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from '../interfaces/book';
import { Category } from '../interfaces/category';
import { BookserviceService } from '../services/bookservice.service';

@Component({
  selector: 'app-bookpage',
  templateUrl: './bookpage.component.html',
  styleUrls: ['./bookpage.component.sass']
})
export class BookpageComponent implements OnInit {
  public categoriesList:Category[] | undefined;
  public books:Book[] | undefined;

  constructor(private http: HttpClient,private BookService:BookserviceService) { }

  ngOnInit(): void {
    this.BookService.getAllBooks().subscribe((response: any) =>{
      this.books = response.value;
    })
    this.getCategories();
  }

  getCategories(): void{
    this.BookService.getAllCategories().subscribe((response: any) =>{
      this.categoriesList = response.value;
    })
  }

  addCart(id:number){
    console.log(id)
  }

}
