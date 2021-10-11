import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor  {

  constructor(private autenticacionService:AutenticacionService) { }
  intercept( req:HttpRequest<any>, next:HttpHandler ): Observable<HttpEvent<any>>{

    const token = localStorage.getItem('token');
    let tokenHeader:any='';
    if(token!= null){
      tokenHeader = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(tokenHeader);
  }
}
