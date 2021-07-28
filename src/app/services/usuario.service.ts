import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url='http://localhost:3000/user';
  constructor(private http: HttpClient) { }

 
 //get usuarios
 getUsuarios():Observable<any>
 {
   return this.http.get<any>('/user');
 }


 //get un Usuario
 getUnEquipo(id:string){
   return this.http.get(this.url+'/'+id);
 }

 
  //agregar Usuario
  addUsuario(usuario:Usuario)
  {
    return this.http.post(this.url, usuario);
  }


  //eliminar
  deleteUsuario(id:string){
    return this.http.delete(this.url+'/'+id);
  }

  //modificar usuario
  editUsuario(id:string, usuario:Usuario){
    return this.http.put(this.url+'/'+id, usuario);
  }

}

export interface Usuario{
  Id_Usuario?:string | undefined;
  Nombre_Usuario?:string;
  Apellido_Usuario?:string;
  Usuario?:string;
  Celular?:number;
  email?:string;
  Fk_Id_Rol?:string;
  Fk_Id_Area?:string;
}