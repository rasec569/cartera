import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { aporte } from '../Models/aporte.model';

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
export class AportesService {

  constructor(private http:HttpClient) { }
  //listar Aportes Acuerdo
  public getAportesAcuerdo(acuerdoid: any): Observable<any> {
    HttpOptionsBody.body.id=acuerdoid;
    return this.http.get(`${environment.url}/aporte/acuerdo/${acuerdoid}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //listar Aportes Adicioneles
  public getAportesAdicioneles(contratoid: any): Observable<any> {
    HttpOptionsBody.body.id=contratoid;
    return this.http.get(`${environment.url}/aporte/contrato/${contratoid}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //buscar
  public getAporte(id: any): Observable<any> {
    HttpOptionsBody.body.id=id;
    return this.http.get(`${environment.url}/aporte/${id}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //registrar Aporte Acuerdo
  public createAporteAcuerdo(Aporte:aporte): Observable<any> {
    return this.http
      .post(`${environment.url}/aporte/acuerdo/`, Aporte, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
  //registrar Aporte Adicional
  public createAporteAdicional(Aporte:aporte): Observable<any> {
    return this.http
      .post(`${environment.url}/aporte/contrato/`, Aporte, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }

  //eliminar
  public deleteAporte(Aporte: aporte): Observable<any> {
    HttpOptionsBody.body.id=Aporte.id;
    return this.http
      .delete(`${environment.url}/aporte/`,HttpOptionsBody)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );;
  }
  //modificar
  public updateAporte(Aporte: aporte): Observable<any> {
    return this.http
      .put(`${environment.url}/aporte/${Aporte.id}`, Aporte, httpOptions)
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
