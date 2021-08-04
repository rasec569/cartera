import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private URL='http://localhost:3000';
constructor(private http:HttpClient) { }

//listar
getProyectos(){
  return this.http.get(`${this.URL}/proyecto/`);
}
//buscar
getProyecto(id:string){
  return this.http.get(`${this.URL}/proyecto/`+id);
}
//registrar
newProyecto(proyecto:Proyecto){
  return this.http.post(`${this.URL}/proyecto/`, proyecto);
}
//eliminar
delete(id:string){
  return this.http.delete(`${this.URL}/proyecto/`+id);
}
//modificar
editProyecto(id:string, proyecto:Proyecto){
  return this.http.put(`${this.URL}/proyecto/`+id, proyecto);
}
}
export interface Proyecto{
  Id_Proyecto?:string|undefined;
  Nombre_Proyecto:string;
  Ubicacion_Proyecto:string;
}
