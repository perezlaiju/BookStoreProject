import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Book } from '../interfaces/book';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  private baseUrl = 'http://localhost:61163/odata/';

  public books:Book[] | undefined;
  public book:Book | undefined;

  public categories:Category[] | undefined;
  public category:Category | undefined;

  constructor(private http: HttpClient) { }

  getAllBooks(): any{
    return this.getAll('Books');
  }
  getAllCategories():any{
    return this.getAll('Categories');
  }
  getAll(type:string){
    return this.http.get(this.baseUrl+type);
  }

  getBook(id: string | null ):any{
    return this.getById(id,'Books');
  }
  getCategory(id: string | null ):any{
    return this.getById(id,'Categories');
  }
  getById(id: string | null ,type:string):any{
    return this.http.get(this.baseUrl+type+'('+id+')');
  }

  delBook(id: { toString: () => string; }):any{
    return this.delById(id,'Books');
  }
  delCategory(id: { toString: () => string; }):any{
    return this.delById(id,'Categories');
  }
  delById(id: { toString: () => string; },type:string){
    return this.http.delete(this.baseUrl+type+'('+id+')');
  }

  addBook(newBook:any):any{
return this.addData(newBook,'Books')
  }
  addCategory(newCategory:any):any{
    return this.addData(newCategory,'Categories')
  }

  addData(newData:any,type:string):any{
    return this.http.post(this.baseUrl+type, newData)
    .pipe( map( (res: any) => {
      return res;
    }));
  }

  updateBook( updateableBookData: any): any {
    return this.updateData(updateableBookData,'Books');
  }
  updateCategory( updateableCategoryData: any): any {
    return this.updateData(updateableCategoryData,'Categories');
  }


updateData( updateableData: any,type:string): any {
  delete updateableData["odata.metadata"];
  console.log(updateableData.Id);
  console.log(updateableData);

  
  return this.http.put(this.baseUrl +type+'('+updateableData.Id+')', updateableData)
    .toPromise()
    .then( (res: any) => {
      console.log(res);
      return res;
    })
    .catch( (err: any) => {
      console.log(err);
      return err;
    })
    .finally( () => {
      console.log('It is over!');
    });
}
}
