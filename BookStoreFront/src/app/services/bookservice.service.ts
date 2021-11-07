import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  private baseUrl = 'http://localhost:61163/odata/';
  public books:Book[] | undefined;
  constructor(private http: HttpClient) { }

  getAllBooks(): any{
    return this.http.get(this.baseUrl+'Books')
  }
}
