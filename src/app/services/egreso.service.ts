import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { egreso } from '../Models/egreso.model';
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
export class EgresoService {

  constructor(private http:HttpClient) { }
   //listar
   public getEgresos(): Observable<any> {
    return this.http.get(`${environment.url}/egreso/`, httpOptions).pipe(
      tap((result: any) => {}),
      catchError(this.handleError)
    );
  }
  //listar egresos obligacion
  public getEgresosObligacion(obligacionid: any): Observable<any> {
    HttpOptionsBody.body.id=obligacionid;
    return this.http.get(`${environment.url}/egreso/obligacion/${obligacionid}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //buscar
  public getEgreso(id: any): Observable<any> {
    HttpOptionsBody.body.id=id;
    return this.http.get(`${environment.url}/egreso/${id}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }

  //registrar
  public createEgreso(Egreso:egreso): Observable<any> {
    return this.http
      .post(`${environment.url}/egreso/`, Egreso, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
  //eliminar
  public deleteEgreso(Egreso: egreso): Observable<any> {
    HttpOptionsBody.body.id=Egreso.id;
    return this.http
      .delete(`${environment.url}/egreso/`,HttpOptionsBody)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );;
  }
  //modificar
  public updateEgreso(Egreso: egreso): Observable<any> {
    return this.http
      .put(`${environment.url}/egreso/${Egreso.id}`, Egreso, httpOptions)
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
