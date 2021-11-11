import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginDetailsForm :FormGroup = new FormGroup({
    grant_type : new FormControl('password'),
    username : new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private auth : AuthserviceService,private _location: Location) { }

  ngOnInit(): void {
  }

  handleLogin():void{
    this.auth.login(this.loginDetailsForm.value).subscribe((res: any) => { 
      console.log(res);
      this._location.back();
    });
  }

}
