import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { acuerdo } from '../Models/acuerdo.model';
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
export class AcuerdoService {

  constructor(private http:HttpClient) { }
  //listar acuerdos del contrato
  public getAcuerdosContrato(contratoid: any): Observable<any> {
    HttpOptionsBody.body.id=contratoid;
    return this.http.get(`${environment.url}/acuerdo/contrato/${contratoid}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //buscar
  public getAcuerdo(id: any): Observable<any> {
    HttpOptionsBody.body.id=id;
    return this.http.get(`${environment.url}/acuerdo/${id}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //registrar
  public createAcuerdo(Acuerdo:acuerdo): Observable<any> {
    return this.http
      .post(`${environment.url}/acuerdo/`, Acuerdo, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
  //eliminar
  public deleteAcuerdo(Acuerdo: acuerdo): Observable<any> {
    HttpOptionsBody.body.id=Acuerdo.id;
    return this.http
      .delete(`${environment.url}/acuerdo/`,HttpOptionsBody)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );;
  }
  //modificar
  public updateAcuerdo(Acuerdo: acuerdo): Observable<any> {
    return this.http
      .put(`${environment.url}/acuerdo/${Acuerdo.id}`, Acuerdo, httpOptions)
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
