import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookserviceService } from 'src/app/services/bookservice.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.sass']
})
export class AddCategoriesComponent implements OnInit {

  addCategoryForm :FormGroup = new FormGroup({
    Name : new FormControl('',Validators.required),
    Description: new FormControl('', Validators.required),
    ImageUrl: new FormControl(null),
    Status: new FormControl(''),
    Position: new FormControl('', Validators.required),
  });
  isSaved = false;

  constructor(private BookService:BookserviceService,private _location: Location) { }

  ngOnInit(): void {
  }

  handleAddCategory(): void{
    console.log(this.addCategoryForm.value)

    this.BookService.addCategory(this.addCategoryForm.value).subscribe((res: any) => { 
      console.log(res);

      if(res && res.id){
        this.isSaved = true;
      }
      this._location.back();
    });
  }

}
