import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { acreedor } from '../Models/acreedor.model';

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
export class AcreedorService {

  constructor(private http:HttpClient) { }
//listar Acreedor
public getAcreedores(): Observable<any> {
  return this.http.get(`${environment.url}/acreedor/`,httpOptions).pipe(
    tap((result: any) => {
    }),
    catchError(this.handleError)
  );
}
  //buscar Acreedor
  public getAcreedor(idacreedor: any): Observable<any> {
    HttpOptionsBody.body.id=idacreedor;
    return this.http.get(`${environment.url}/acreedor/${idacreedor}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //agregar Acreedor
  public createAcreedor(Acreedor: acreedor): Observable<any> {
    return this.http
      .post(`${environment.url}/acreedor/`, Acreedor, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
   //modificar Acreedor
  public updateAcreedor(Acreedor: acreedor): Observable<any> {
    return this.http
      .put(`${environment.url}/acreedor/${Acreedor.idacreedor}`, Acreedor, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
//eliminar Acreedor
public deleteAcreedor(Acreedor: acreedor): Observable<any> {
  HttpOptionsBody.body.id=Acreedor.idacreedor;
  return this.http
    .delete(`${environment.url}/acreedor/`,HttpOptionsBody)
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
