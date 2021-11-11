import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  checkPasswords: ValidatorFn = (group: any):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }

  registerDetailsForm :FormGroup = new FormGroup({
    email : new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword : new FormControl('', Validators.required)
  });

  constructor(private auth : AuthserviceService) { }

  ngOnInit(): void {
  }

  handleRegister():void{
    this.auth.register(this.registerDetailsForm.value).subscribe((res:any)=>console.log(res));
  }

}
