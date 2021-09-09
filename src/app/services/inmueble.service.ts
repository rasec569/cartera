import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { inmueble } from '../Models/inmueble.model';
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
export class InmuebleService {
  constructor(private http:HttpClient) { }
  //listar
  public getInmuebles(): Observable<any> {
    return this.http.get(`${environment.url}/inmueble/`,httpOptions).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
    }
    //buscar
    public getInmueble(Inmueble: inmueble): Observable<any> {
      HttpOptionsBody.body.id=Inmueble.id;
      return this.http.get(`${environment.url}/inmueble/${Inmueble.id}`,HttpOptionsBody).pipe(
        tap((result: any) => {
        }),
        catchError(this.handleError)
      );
    }
    //registrar
    public createInmueble(Inmueble:inmueble): Observable<any> {
      return this.http
        .post(`${environment.url}/inmueble/`, Inmueble, httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(result);
          }),
          catchError(this.handleError)
        );
    }
    //eliminar
    public deleteInmueble(Inmueble: inmueble): Observable<any> {
      HttpOptionsBody.body.id=Inmueble.id;
      return this.http
        .delete(`${environment.url}/inmueble/`,HttpOptionsBody)
        .pipe(
          tap((result: any) => {
            console.log(result);
          }),
          catchError(this.handleError)
        );;
    }
    //modificar
    public updateInmueble(Inmueble: inmueble): Observable<any> {
      return this.http
        .put(`${environment.url}/inmueble/${Inmueble.id}`, Inmueble, httpOptions)
        .pipe(
          tap((result: any) => {
            console.log(result);
          }),
          catchError(this.handleError)
        );
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
