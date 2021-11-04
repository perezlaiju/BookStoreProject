import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http
    .get('http://localhost:61163/odata/Books')
    .subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);
    })
  }

}
