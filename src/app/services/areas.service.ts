import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {area} from '../Models/area.model';

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
export class AreasService {
  constructor(private http:HttpClient) { }
    //listar
  public getAreas(): Observable<any> {
    return this.http.get(`${environment.url}/area/`,httpOptions).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //buscar
  public getArea(Area: area): Observable<any> {
    HttpOptionsBody.body.id!=Area.id;
    return this.http.get(`${environment.url}/area/${Area.id}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //registrar
  public createArea(Area:area): Observable<any> {
    return this.http
      .post(`${environment.url}/area/`, Area, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
  //eliminar
  public deleteArea(Area: area): Observable<any> {
    HttpOptionsBody.body.id!=Area.id;
    return this.http
      .delete(`${environment.url}/area/`,HttpOptionsBody)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );;
  }
  //modificar
  public updateArea(Area: area): Observable<any> {
    console.log(Area)
    return this.http
      .put(`${environment.url}/area/${Area.id}`, Area, httpOptions)
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

