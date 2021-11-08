import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookserviceService } from 'src/app/services/bookservice.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Book } from 'src/app/interfaces/book';


@Component({
  selector: 'app-updt-books',
  templateUrl: './updt-books.component.html',
  styleUrls: ['./updt-books.component.sass']
})
export class UpdtBooksComponent implements OnInit {
  bookData : any;
  duplicateBookData : any;
  isUpdated = false;
  
  constructor(private BookService: BookserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let bookId = this.route.snapshot.paramMap.get('id');

    this.BookService.getBook(bookId)
      .subscribe( ( res: any) => {
        //console.log(res);
        //console.log(res.value)
        this.bookData = res;
        this.duplicateBookData = { ...this.bookData };
      });

      
  }
  
  async handleUpdate(){
    console.log(this.duplicateBookData); // before sending to the service

    let status = await this.BookService.updateBook(this.duplicateBookData);
    console.log(status);

    if(status && status.id){
      this.isUpdated = true;
    }
  }
}
