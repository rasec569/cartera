import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { usuario } from '../Models/usuario.model';

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
export class UserService {
  constructor(private http:HttpClient) { }
  //listar Usuario
  public getUsuarios(): Observable<any> {
    return this.http.get(`${environment.url}/user/`,httpOptions).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //buscar
  public getUsuario(iduser: any): Observable<any> {
    HttpOptionsBody.body.id!=iduser;
    return this.http.get(`${environment.url}/user/${iduser}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //agregar Usuario
  public createUsuarrio(Usuario: usuario): Observable<any> {
    return this.http
      .post(`${environment.url}/user/`, Usuario, httpOptions)
      .pipe(
        tap((result: any) => {
        }),
        catchError(this.handleError)
      );
  }
   //modificar Usuario
  public updateUsuario(User: usuario): Observable<any> {
    return this.http
      .put(`${environment.url}/user/${User.iduser}`, User, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
//eliminar Usuario
public deleteUsuario(User: usuario): Observable<any> {
  HttpOptionsBody.body.id=User.iduser;
  return this.http
    .delete(`${environment.url}/user/`,HttpOptionsBody)
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
