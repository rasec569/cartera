import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { obligacion } from '../Models/obligacion.model';

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
export class ObligacionesService {

  constructor(private http:HttpClient) { }
  //listar
  public getObligacionesVencidas(): Observable<any> {
    return this.http.get(`${environment.url}/obligacion/vencidas/`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //listar
  public getObligacionesPorPagar(): Observable<any> {
    return this.http.get(`${environment.url}/obligacion/pagar/`,httpOptions).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
//listar Obligaciones
  public getObligaciones(): Observable<any> {
    return this.http.get(`${environment.url}/obligacion/`,httpOptions).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
    //buscar Obligacion
    public getObligacion(id: any): Observable<any> {
      HttpOptionsBody.body.id=id;
      return this.http.get(`${environment.url}/obligacion/${id}`,HttpOptionsBody).pipe(
        tap((result: any) => {
        }),
        catchError(this.handleError)
      );
    }
    //agregar Obligacion
    public createObligacion(Obligacion: obligacion): Observable<any> {
      return this.http
        .post(`${environment.url}/obligacion/`, Obligacion, httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(result);
          }),
          catchError(this.handleError)
        );
    }
     //modificar Obligacion
    public updateObligacion(Obligacion: obligacion): Observable<any> {
      return this.http
        .put(`${environment.url}/obligacion/${Obligacion.id}`, Obligacion, httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(result);
          }),
          catchError(this.handleError)
        );
    }
  //eliminar Obligacion
  public deleteObligacion(Obligacion: obligacion): Observable<any> {
    HttpOptionsBody.body.id=Obligacion.id;
    console.log(Obligacion.id)
    return this.http
      .delete(`${environment.url}/obligacion/`,HttpOptionsBody)
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
