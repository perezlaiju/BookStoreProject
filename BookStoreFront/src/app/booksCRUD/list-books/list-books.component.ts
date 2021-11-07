import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { BookserviceService } from 'src/app/services/bookservice.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.sass']
})
export class ListBooksComponent implements OnInit {
  public books:Book[] | undefined;
  constructor(private BookService:BookserviceService) { }

  ngOnInit(): void {
    this.getBooks();
  }
  
  getBooks(): void{
    this.BookService.getAllBooks().subscribe((response: any) =>{
      this.books = response.value;
    })
  }

  deleteBook(id:number): void{
    this.BookService.delBook(id).subscribe((response: any) =>{
      this.getBooks();
      console.log(response);
      console.log("Deleted hopefully")
    })
  }



}