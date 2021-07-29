import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL='http://localhost:3000';

  constructor(private http:HttpClient) { }
  NewUser(user:User){
    /* console.log('por aqui paso',user); */
    return this.http.post(`${this.URL}/user/`, user);
  }
  getUsuarios(){
    return this.http.get(`${this.URL}/user/`);
  }
  getusuario(id:string){
    return this.http.get(`${this.URL}/user/`+id);
  }
  deleteUsuario(id:string){
  return this.http.delete(`${this.URL}/user/`+id);
  }
  editUsuario(id:string, user:User){
  return this.http.put(`${this.URL}/user/`+id, user);
  }
}

export interface User{
  Id_Usuario?:string;
  Nombre_Usuario?:string;
  Apellido_Usuario?:string;
  Usuario?:string;
  password?:string;
  Celular?:string;
  email?:string;
  Rol?:string;
  Area?:string;
}
