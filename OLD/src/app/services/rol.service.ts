import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RolService {
  private URL='http://localhost:3000';

  constructor(private http:HttpClient) { }
  //listar rol
  getRoles(){
  return this.http.get(`${this.URL}/rol/`);
  }
  //get un rol
  getRol(id:string){
    return this.http.get(`${this.URL}/rol/`+id);
  }
//agregar rol
  newRol(rol:Rol){
  /* console.log('por aqui paso',user); */
  return this.http.post(`${this.URL}/rol/`, rol);
  }
    //eliminar
  deleteRol(id:string){
  return this.http.delete(`${this.URL}/rol/`+id);
  }
   //modificar Usuario
  editRol(id:string, rol:Rol){
  return this.http.put(`${this.URL}/rol/`+id, rol);
  }
}

export interface Rol{
  Id_Rol?:string|undefined;
  Nombre_Rol:string;
  Descripcion:string;
}
