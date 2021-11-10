import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  public baseurl = "https://localhost:44347/";

  private isLoggedIn = false;
  private isAdmin = false;

  public options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', 'Bearer ' + this.gettoken())
  };
  constructor(private http: HttpClient) { }

  login(data: any): any {
    console.log(data);
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.set('grant_type', 'password');
    urlSearchParams.set('username', data.username);
    urlSearchParams.set('password', data.password);
    let body = urlSearchParams.toString();
    console.log(body);
    return this.http.post(this.baseurl + 'Token', body, this.options).subscribe((res: any) => {
      //console.log(res);
      //console.log(res.access_token);
      localStorage.setItem('token', res.access_token);
      console.log('token saved');
      return res;
    });
  }
  gettoken():any{
    return localStorage.getItem('token');
  }
}
