import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private URL='http://localhost:3000';

  constructor(private http:HttpClient) { }
  //listar clientes
  getClientes(){
    return this.http.get(`${this.URL}/clients/`);
  }


}

export interface Clients{
  Id_Cliente?:string;
  identificacion:string;
  Nombre_Cliente:string;
  Apellido_Cliente:string;
  telefono:string;
  correo:string;
  direccion:string;
}
