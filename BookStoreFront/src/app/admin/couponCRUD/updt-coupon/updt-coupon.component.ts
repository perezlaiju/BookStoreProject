import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookserviceService } from 'src/app/services/bookservice.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Book } from 'src/app/interfaces/book';
import {Location} from '@angular/common';

@Component({
  selector: 'app-updt-coupon',
  templateUrl: './updt-coupon.component.html',
  styleUrls: ['./updt-coupon.component.sass']
})
export class UpdtCouponComponent implements OnInit {

  couponData : any;
  duplicateCouponData : any;
  isUpdated = false;
  
  constructor(private BookService: BookserviceService, private route: ActivatedRoute,private _location: Location) { }

  ngOnInit(): void {
    let couponId = this.route.snapshot.paramMap.get('id');

    this.BookService.getById(couponId,'Coupons')
      .subscribe( ( res: any) => {
        //console.log(res);
        //console.log(res.value)
        this.couponData = res;
        this.duplicateCouponData = { ...this.couponData };
      });    
  }

  handleClose(){
    this._location.back();
  }
  
  async handleUpdate(){
    console.log(this.duplicateCouponData); // before sending to the service

    let status = await this.BookService.updateData(this.duplicateCouponData,'Coupons');
    console.log(status);

    if(status && status.id){
      this.isUpdated = true;
      
    }
    this._location.back();
  }

}
