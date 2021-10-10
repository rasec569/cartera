import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {rol} from '../Models/rol.model';

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
  providedIn: "root",
})
export class RolService {
  constructor(private http: HttpClient) {}
  //listar
  public getRoles(): Observable<any> {
    return this.http.get(`${environment.url}/rol/`, httpOptions).pipe(
      tap((result: any) => {}),
      catchError(this.handleError)
    );
  }
  //buscar
  public getRol(Rol: rol): Observable<any> {
    HttpOptionsBody.body.id!=Rol.id;
    return this.http.get(`${environment.url}/rol/${Rol.id}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //registrar
  public createRol(Rol:rol): Observable<any> {
    return this.http
      .post(`${environment.url}/rol/`, Rol, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
  //eliminar
  public deleteRol(Rol: rol): Observable<any> {
    HttpOptionsBody.body.id!=Rol.id;
    return this.http
      .delete(`${environment.url}/rol/`,HttpOptionsBody)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );;
  }
  //modificar
  public updateRol(Rol: rol): Observable<any> {
    return this.http
      .put(`${environment.url}/rol/${Rol.id}`, Rol, httpOptions)
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

