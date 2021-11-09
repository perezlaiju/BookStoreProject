import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookserviceService } from 'src/app/services/bookservice.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-updt-categories',
  templateUrl: './updt-categories.component.html',
  styleUrls: ['./updt-categories.component.sass']
})
export class UpdtCategoriesComponent implements OnInit {

  categoryData : any;
  duplicateCategoryData : any;
  isUpdated = false;

  constructor(private BookService: BookserviceService, private route: ActivatedRoute,private _location: Location) { }

  ngOnInit(): void {
    let catId = this.route.snapshot.paramMap.get('id');

    this.BookService.getCategory(catId)
      .subscribe( ( res: any) => {
        this.categoryData = res;
        this.duplicateCategoryData = { ...this.categoryData };
      });  
  }

  handleClose(){
    this._location.back();
  }
  
  async handleUpdate(){
    console.log(this.duplicateCategoryData); // before sending to the service

    let status = await this.BookService.updateCategory(this.duplicateCategoryData);
    console.log(status);

    if(status && status.id){
      this.isUpdated = true;    
    }
    this._location.back();
  }
}
