import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { clienteInterface } from "../interfaces/cliente.interface";
import { cliente } from "../Models/cliente.model";

const httpOptions = {
  headers: new HttpHeaders(
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+localStorage.getItem("token")
    }
  ),
};
@Injectable({
  providedIn: "root",
})
export class ClientesService {
  constructor(private http: HttpClient) {}

  //listar clientes
  public getClientes(): Observable<any> {
    return this.http.get(`${environment.url}/clients/`,httpOptions).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  // crear cliente
  public createCliente(newClient: cliente): Observable<any> {
    return this.http
      .post(`${environment.url}/clients/`, newClient, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
  // modificar cliente
  public updateCliente(Client: cliente): Observable<any> {
    return this.http
      .put(`${environment.url}/clients/`, Client, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
  // eliminar cliente
  public deleteCliente(Client: cliente): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "Bearer "+localStorage.getItem("token")
      }),
      body: {
        id: Client.id,
      },
    };

    return this.http
      .delete(`${environment.url}/clients/`,options)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );;
  }

  // error handle
  handleError(error: HttpErrorResponse) {
    let errorMessage = "Unknown error!";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
