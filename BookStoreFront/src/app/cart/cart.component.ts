import { Component, OnInit } from '@angular/core';
import { Book } from '../interfaces/book';
import { BookserviceService } from '../services/bookservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  public cartBooks:Book[] | undefined;
  public totalPrice=0;
  constructor(private BookService:BookserviceService) { }

  ngOnInit(): void {
    this.fillData();

  }

  fillData():void{
    this.BookService.getAllBooks().subscribe((response: any) =>{
      this.cartBooks = response.value;
      this.cartBooks?.forEach(item=>this.totalPrice+=item.Price)
    })
  }

}
