import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Book } from '../interfaces/book';
import { Category } from '../interfaces/category';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  private baseUrl = 'https://localhost:44347/odata/';

  public books:Book[] | undefined;
  public book:Book | undefined;

  public categories:Category[] | undefined;
  public category:Category | undefined;

  constructor(private http: HttpClient,private auth:AuthserviceService) { }
  headers = this.auth.options;

  getAllBooks(): any{
    return this.getAll('Books');
  }
  getAllCategories():any{
    return this.getAll('Categories');
  }
  getAll(type:string){
    return this.http.get(this.baseUrl+type,this.headers);
  }

  getBook(id: string | null ):any{
    return this.getById(id,'Books');
  }
  getCategory(id: string | null ):any{
    return this.getById(id,'Categories');
  }
  getById(id: string | null ,type:string):any{
    return this.http.get(this.baseUrl+type+'('+id+')',this.headers);
  }

  delBook(id: { toString: () => string; }):any{
    return this.delById(id,'Books');
  }
  delCategory(id: { toString: () => string; }):any{
    return this.delById(id,'Categories');
  }
  delById(id: { toString: () => string; },type:string){
    return this.http.delete(this.baseUrl+type+'('+id+')',this.headers);
  }

  addBook(newBook:any):any{
return this.addData(newBook,'Books')
  }
  addCategory(newCategory:any):any{
    return this.addData(newCategory,'Categories')
  }

  addData(newData:any,type:string):any{
    return this.http.post(this.baseUrl+type, this.auth.getparams(newData),this.headers)
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

  
  return this.http.put(this.baseUrl +type+'('+updateableData.Id+')', updateableData,this.auth.tokenheader)
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

addToCart(id:number):any{
  return this.http.post(this.baseUrl+'CartItems',{'Book_Id':id,'Quantity':1},this.auth.tokenheader);
}
getCart():any{
  return this.http.get(this.baseUrl+'Carts');
}
}
