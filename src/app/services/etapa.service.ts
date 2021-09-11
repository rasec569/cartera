import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {etapa} from '../Models/etapa.model';
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
export class EtapaService {

constructor(private http:HttpClient) { }
//listar etapas proyecto select inmueble
public getEtapasProyecto(Etapa: etapa): Observable<any> {
  HttpOptionsBody.body.id=Etapa.idproyecto;
  return this.http.get(`${environment.url}/etapa/proyecto/${Etapa.idproyecto}`,HttpOptionsBody).pipe(
    tap((result: any) => {
    }),
    catchError(this.handleError)
  );
}
//buscar
public getEtapa(Etapa: etapa): Observable<any> {
  HttpOptionsBody.body.id=Etapa.id;
  return this.http.get(`${environment.url}/etapa/${Etapa.id}`,HttpOptionsBody).pipe(
    tap((result: any) => {
    }),
    catchError(this.handleError)
  );
}

//registrar
public createEtapa(Etapa:etapa): Observable<any> {
  return this.http
    .post(`${environment.url}/etapa/`, Etapa, httpOptions)
    .pipe(
      tap((result: any) => {
        console.log(result);
      }),
      catchError(this.handleError)
    );
}
//eliminar
public deleteEtapa(Etapa: etapa): Observable<any> {
  HttpOptionsBody.body.id=Etapa.id;
  return this.http
    .delete(`${environment.url}/etapa/`,HttpOptionsBody)
    .pipe(
      tap((result: any) => {
        console.log(result);
      }),
      catchError(this.handleError)
    );;
}
//modificar
public updateEtapa(Etapa: etapa): Observable<any> {
  return this.http
    .put(`${environment.url}/etapa/${Etapa.id}`, Etapa, httpOptions)
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
