import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { cartera } from '../Models/cartera.model';
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
export class CarteraService {

  constructor(private http:HttpClient) { }
  //listar
  public getCartera(): Observable<any> {
    return this.http.get(`${environment.url}/cartera/`, httpOptions).pipe(
      tap((result: any) => {}),
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
