import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   private URL='http://localhost:3000';

  constructor(private http:HttpClient) { }
//listar usuarios
  getUsuarios(): Observable<any>{
    return this.http.get<any>(`${this.URL}/user/`);
  }
  //buscar usuario
  getUsuario(id:string){
    return  this.http.get(`${this.URL}/user/`+id)
  }
  //nuevo usuario
  NewUser(user:User){
    /* console.log('por aqui paso',user); */
    return this.http.post(`${this.URL}/user/`, user);
  }
  //eliminar usuario
  deltetUser(id:string){
    return this.http.delete(`${this.URL}/user/`+id);
  }
  //actulizar usuario
  editUser(id:string, user:User){
    return this.http.put(`${this.URL}/user/`+id, user);
  }
}
export interface User{
  id?:string;
  Nombres?:string;
  Apellidos?:string;
  Usuario?:string;
  password?:string;
  Celular?:string;
  email?:string;
  Rol?:string;
  Area?:string;
}
