import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { tap, catchError, delay } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { file } from "../Models/file.model";

const httpOptions = {
  headers: new HttpHeaders(
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+localStorage.getItem("token")
    }
  )
};
const HttpOptionsBody = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "Bearer "+localStorage.getItem("token")
  }),
  body: {
    id: "",
  },
};
const HttpOptionsFile={
  headers: new HttpHeaders(
    {
      "Authorization": "Bearer "+localStorage.getItem("token")
    }
  ),
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(private http: HttpClient) {}

  //listar archivos
  public getfiles(): Observable<any> {
    return this.http.get(`${environment.url}/archivo/`,httpOptions).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  // crear archivos
  public createfiles(FileData: any): Observable<any> {
    return this.http
      .post(`${environment.url}/archivo/`, FileData, HttpOptionsFile)
      .pipe(
        tap((result: any) => {
        }),
        catchError(this.handleError)
      );
  }

  // eliminar archivos
  public deletefiles(File: file): Observable<any> {
    HttpOptionsBody.body.id=File.idArchivo;
    return this.http
      .delete(`${environment.url}/archivo/`,HttpOptionsBody)
      .pipe(
        tap((result: any) => {
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
