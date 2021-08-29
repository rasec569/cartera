import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private URL='http://localhost:3000';

  constructor(private http:HttpClient,
    private jwtHelper:JwtHelperService) { }

  signin(user:any){
    return this.http.post(`${this.URL}/user/signin`, user);
  }
  isAuth():boolean{
    const token:any= localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) ||!localStorage.getItem('token')){
      return false;
    }
    return true;

  }
}
