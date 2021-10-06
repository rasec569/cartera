import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { proyecto } from '../Models/proyecto.model';

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
export class ProyectoService {
  constructor(private http:HttpClient) { }
  //listar
  public getProyectos(): Observable<any> {
  return this.http.get(`${environment.url}/proyecto/`,httpOptions).pipe(
    tap((result: any) => {
    }),
    catchError(this.handleError)
  );
  }
  //buscar
  public getProyecto(Proyecto: proyecto): Observable<any> {
    HttpOptionsBody.body.id=Proyecto.id;
    return this.http.get(`${environment.url}/proyecto/${Proyecto.id}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //registrar
  public createProyecto(Proyecto:proyecto): Observable<any> {
    return this.http
      .post(`${environment.url}/proyecto/`, Proyecto, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
  //eliminar
  public deleteProyecto(Proyecto: proyecto): Observable<any> {
    HttpOptionsBody.body.id=Proyecto.id;
    return this.http
      .delete(`${environment.url}/proyecto/`,HttpOptionsBody)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );;
  }
  //modificar
  public updateProyecto(Proyecto: proyecto): Observable<any> {
    return this.http
      .put(`${environment.url}/proyecto/${Proyecto.id}`, Proyecto, httpOptions)
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
