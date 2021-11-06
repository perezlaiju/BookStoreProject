import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../book';
import { TestServiceService } from '../test-service.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  public books:Book[] | undefined;

  constructor(private http: HttpClient,private bookService:TestServiceService) { }

  ngOnInit(): void {
    
    this.bookService.getAllBooks().subscribe((response: any) =>{
      this.books = response.value;
    })

  }

}
