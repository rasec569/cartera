import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  url='http://localhost:3000';
  constructor(private http: HttpClient) { }


  //get equipos
  getEquipos()
  {
    return this.http.get(this.url);
  }


  //get un Equipo
  getUnEquipo(id:string){
    return this.http.get(this.url+'/user'+id);
  }


  //agregar equipo
  addEquipo(equipo:Equipo)
  {
    return this.http.post(this.url, equipo);
  }


  //eliminar
  deleteEquipo(id:string){
    return this.http.delete(this.url+'/'+id);
  }

  //modificar equipo
  editEquipo(id:string, equipo:Equipo){
    return this.http.put(this.url+'/'+id, equipo);
  }

}


export interface Equipo{
  id_equipo?:string;
  nombre?:string;
  logo?:string;
}
