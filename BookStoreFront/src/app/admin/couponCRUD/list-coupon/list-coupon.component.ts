import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/interfaces/coupon';
import { BookserviceService } from 'src/app/services/bookservice.service';

@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrls: ['./list-coupon.component.sass']
})
export class ListCouponComponent implements OnInit {
  public coupon:Coupon[] | undefined;
  
  constructor(private BookService:BookserviceService) { }

  ngOnInit(): void {
    this.getCoupon();
  }
  
  getCoupon(): void{
    this.BookService.getAll('Coupons').subscribe((response: any) =>{
      this.coupon = response.value;
    })
  }

  deleteCoupon(id:number): void{
    this.BookService.delById(id,'Coupons').subscribe((response: any) =>{
      this.getCoupon();
      console.log(response);
      console.log("Deleted hopefully.")
    })
  }
}
