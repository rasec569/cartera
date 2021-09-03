import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cliente } from '../interfaces/cliente.interface';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private URL='http://localhost:3000';

  constructor(private http:HttpClient) { }
  //listar clientes
  public getClientes(): Observable<any> {
    return this.http.get(`${this.URL}/clients/`).pipe(
      tap((result: any) => {
        /*if (result.token) {
          this.storage.set(EAuthTokens.accessToken, result.token);
        }*/
      }),
      catchError(this.handleError));;
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
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
