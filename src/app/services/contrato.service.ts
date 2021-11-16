import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { contrato } from '../Models/contrato.model';

const httpOptions = {
  headers: new HttpHeaders(
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+localStorage.getItem("token")
    }
  ),
};
const HttpOptionsBody = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "Bearer "+localStorage.getItem("token")
  }),
  body: {id: "",},
};

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private http:HttpClient) { }
  //listar contratos
  public getContratos(): Observable<any> {
    return this.http.get(`${environment.url}/contrato/`,httpOptions).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //listar contratos cliente
  public getContratosCliente(clienteid: any): Observable<any> {
    HttpOptionsBody.body.id=clienteid;
    return this.http.get(`${environment.url}/contrato/cliente/${clienteid}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //buscar
  public getContrato(id: any): Observable<any> {
    HttpOptionsBody.body.id=id;
    return this.http.get(`${environment.url}/contrato/${id}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }

  //registrar
  public createContrato(Contrato:contrato): Observable<any> {
    return this.http
      .post(`${environment.url}/contrato/`, Contrato, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
  //eliminar
  public deleteContrato(Contrato: contrato): Observable<any> {
    HttpOptionsBody.body.id=Contrato.id;
    return this.http
      .delete(`${environment.url}/contrato/`,HttpOptionsBody)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );;
  }
  //modificar
  public updateContrato(Contrato: contrato): Observable<any> {
    return this.http
      .put(`${environment.url}/contrato/${Contrato.id}`, Contrato, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
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
