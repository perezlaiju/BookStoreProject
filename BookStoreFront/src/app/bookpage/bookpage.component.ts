import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from '../interfaces/book';
import { BookserviceService } from '../services/bookservice.service';

@Component({
  selector: 'app-bookpage',
  templateUrl: './bookpage.component.html',
  styleUrls: ['./bookpage.component.sass']
})
export class BookpageComponent implements OnInit {
  public books:Book[] | undefined;

  constructor(private http: HttpClient,private BookService:BookserviceService) { }

  ngOnInit(): void {
    this.BookService.getAllBooks().subscribe((response: any) =>{
      this.books = response.value;
    })
  }

}
