import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  private baseUrl = 'http://localhost:61163/odata/';
  public books:Book[] | undefined;
  public book:Book | undefined;
  constructor(private http: HttpClient) { }

  getAllBooks(): any{
    return this.http.get(this.baseUrl+'Books')
  }

  getBook(id: string | null ):any{
    return this.http.get(this.baseUrl+'Books('+id+')')
  }

  delBook(id: { toString: () => string; }):any{
    return this.http.delete(this.baseUrl+'Books('+id+')')
  }

  addBook(newBook:any):any{
    return this.http.post(this.baseUrl+'Books/', newBook)
    .pipe( map( (res: any) => {
      //console.log(res);
      return res;
    }));
  }

  updateBook( updateableBookData: any): any {
    delete updateableBookData["odata.metadata"]
    console.log(updateableBookData.Id);
    console.log(updateableBookData);

    
    return this.http.put(this.baseUrl +'Books('+updateableBookData.Id+')', updateableBookData)
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
