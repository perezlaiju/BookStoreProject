import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Book } from './book';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {
  private bookUrl = 'http://localhost:61163/odata/Books';
  public books:Book[] | undefined;
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) 
  {

  }

  getAllBooks(): any{
    return this.http.get(this.bookUrl)
  }
  
}
