import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL='http://localhost:3000';

  constructor(private http:HttpClient) { }
  NewUser(user:any){
    /* console.log('por aqui paso',user); */
    return this.http.post(`${this.URL}/user/NewUser`, user);
  }
  getUsuarios(): Observable<any>{
    return this.http.get<any>(`${this.URL}/user/ListarUser`);
  }
}

export interface User{

  Nombres?:string; 
  Apellidos?:string;
  Usuario?:string;
  password?:string;
  Celular?:string;
  email?:string;
  Rol?:string;
  Area?:string;
}
