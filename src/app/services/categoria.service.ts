import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { categoria } from "../Models/categoria.model";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  }),
};
const HttpOptionsBody = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  }),
  body: { id: "" },
};
@Injectable({
  providedIn: "root",
})
export class categoriaService {
  constructor(private http: HttpClient) {}
  //listar
  public getCategorias(): Observable<any> {
    return this.http.get(`${environment.url}/categoria/`, httpOptions).pipe(
      tap((result: any) => {}),
      catchError(this.handleError)
    );
  }
  //buscar
  public getCategoria(id: any): Observable<any> {
    HttpOptionsBody.body.id=id;
    console.log("en service")
    return this.http.get(`${environment.url}/categoria/${id}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
//registrar
public createCategoria(Categoria:categoria): Observable<any> {
  return this.http
    .post(`${environment.url}/categoria/`, Categoria, httpOptions)
    .pipe(
      tap((result: any) => {
        console.log(result);
      }),
      catchError(this.handleError)
    );
}
//eliminar
public deleteCategoria(Categoria: categoria): Observable<any> {
  console.log(Categoria)
  HttpOptionsBody.body.id!=Categoria.id;
  return this.http
    .delete(`${environment.url}/categoria/`,HttpOptionsBody)
    .pipe(
      tap((result: any) => {
        console.log(result);
      }),
      catchError(this.handleError)
    );;
}
//modificar
public updateCategoria(Categoria: categoria): Observable<any> {
  return this.http
    .put(`${environment.url}/categoria/${Categoria.id}`, Categoria, httpOptions)
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
