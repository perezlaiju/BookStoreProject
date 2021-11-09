import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookserviceService } from 'src/app/services/bookservice.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.sass']
})
export class AddBooksComponent implements OnInit {
  
  addBookForm :FormGroup = new FormGroup({
    Title : new FormControl('',Validators.required),
    CategoryId: new FormControl('', Validators.required),
    ISBN: new FormControl('', Validators.required),
    Author: new FormControl('', Validators.required),
    Year: new FormControl('', Validators.required),
    Price: new FormControl('', Validators.required),
    ImageUrl: new FormControl(null),
    Status: new FormControl(''),
    Position: new FormControl('', Validators.required),
  });

  isSaved = false;

  constructor(private BookService:BookserviceService,private _location: Location) { }

  ngOnInit(): void {

  }

  handleAddBook(): void{
    console.log(this.addBookForm.value)

    this.BookService.addBook(this.addBookForm.value).subscribe((res: any) => { 
      console.log(res);

      if(res && res.id){
        this.isSaved = true;
      }
      this._location.back();
    });
  }

}