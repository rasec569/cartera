import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {
  private URL='http://localhost:3000';

  constructor(private http:HttpClient) { }
  //listar
  getInmuebles(){
    return this.http.get(`${this.URL}/inmueble/`);
  }
  //listar por proyectos
  getInmuebleProyecto(id:string){
    return this.http.get(`${this.URL}/inmueble/proyecto`+id);
  }
  //buscar
  getInmueble(id:string){
    return this.http.get(`${this.URL}/inmueble/`+id);
  }
  //insert
newInmueble(inmueble:Inmueble){
  console.log("llego al servicio");
  return this.http.post(`${this.URL}/inmueble/`, inmueble);
  }
//eliminar
deleteInmueble(id:string){
  return this.http.delete(`${this.URL}/inmueble/`+id);
  }
//modificar
editInmueble(id:string, inmueble:Inmueble){
  return this.http.put(`${this.URL}/inmueble/`+id, inmueble);
  }
}
export interface Inmueble{
  Id_Inmueble?:string;
  Manzana:string;
  Num_Casa:string;
  Valor_Inicial:string;
  Ficha_Catastral:string;
  Escritura:string;
  Matricula_inmobiliaria:string;
  Estado:string;
  Fk_Id_Proyecto:string;
}
