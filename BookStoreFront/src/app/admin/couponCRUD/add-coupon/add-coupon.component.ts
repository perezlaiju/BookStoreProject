import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookserviceService } from 'src/app/services/bookservice.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.sass']
})
export class AddCouponComponent implements OnInit {

  addCouponForm :FormGroup = new FormGroup({
    Code : new FormControl('',Validators.required),
    DiscountPercentage: new FormControl('', Validators.required),
    DiscountValue: new FormControl('', Validators.required),
    MinOrderValue: new FormControl('', Validators.required),
    IsClubbable: new FormControl('', Validators.required),
    Status: new FormControl(''),
  });
  isSaved = false;

  constructor(private BookService:BookserviceService,private _location: Location) { }

  ngOnInit(): void {
  }

  handleAddCoupon(): void{
    console.log(this.addCouponForm.value)

    this.BookService.addData(this.addCouponForm.value,'Coupons').subscribe((res: any) => { 
      console.log(res);

      if(res && res.id){
        this.isSaved = true;
      }
      this._location.back();
    });
  }

}
