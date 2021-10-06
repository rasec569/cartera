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
  public getcategorias(): Observable<any> {
    return this.http.get(`${environment.url}/categoria/`, httpOptions).pipe(
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
