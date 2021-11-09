import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { BookserviceService } from 'src/app/services/bookservice.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.sass']
})
export class ListCategoriesComponent implements OnInit {
  public categoriesList:Category[] | undefined;
  constructor(private BookService:BookserviceService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  
  getCategories(): void{
    this.BookService.getAllCategories().subscribe((response: any) =>{
      this.categoriesList = response.value;
    })
  }

  deleteCategory(id:number): void{
    this.BookService.delCategory(id).subscribe((response: any) =>{
      this.getCategories();
      console.log(response);
      console.log("Deleted hopefully")
    })
  }

}
