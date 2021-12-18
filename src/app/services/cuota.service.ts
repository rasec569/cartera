import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { cuota } from '../Models/cuota.model';

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
export class CuotaService {

  constructor(private http:HttpClient) { }
  //listar
  public getCuotasVencidas(): Observable<any> {
    return this.http.get(`${environment.url}/cuota/vencidas/`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //listar
  public getCuotasPorPagar(): Observable<any> {
    return this.http.get(`${environment.url}/cuota/pagar/`,httpOptions).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //listar
  public getCuotasAcuerdo(acuerdoid: any): Observable<any> {
    HttpOptionsBody.body.id=acuerdoid;
    return this.http.get(`${environment.url}/cuota/cliente/${acuerdoid}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //listar
  public getCuotasAcuerdoCredito(acuerdoid: any): Observable<any> {
    HttpOptionsBody.body.id=acuerdoid;
    return this.http.get(`${environment.url}/cuota/credito/${acuerdoid}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //listar
  public getCuotasPendientesAcuerdo(acuerdoid: any): Observable<any> {
    HttpOptionsBody.body.id=acuerdoid;
    return this.http.get(`${environment.url}/cuota/pendiente/${acuerdoid}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //buscar
  public getCuota(id: any): Observable<any> {
    HttpOptionsBody.body.id=id;
    return this.http.get(`${environment.url}/cuota/${id}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //registrar
  public createCuota(Cuota:cuota): Observable<any> {
    return this.http
      .post(`${environment.url}/cuota/`, Cuota, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
  //eliminar
  public deleteCuota(Cuota: cuota): Observable<any> {
    HttpOptionsBody.body.id=Cuota.id;
    return this.http
      .delete(`${environment.url}/cuota/`,HttpOptionsBody)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );;
  }
  //modificar
  public updateCuota(Cuota: cuota): Observable<any> {
    return this.http
      .put(`${environment.url}/cuota/${Cuota.id}`, Cuota, httpOptions)
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
