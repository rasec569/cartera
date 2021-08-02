import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  private URL='http://localhost:3000';

  constructor(private http:HttpClient) { }
    //listar areas
    getAreas(){
      return this.http.get(`${this.URL}/area/`);
    }

}
export interface Area{
  Id_Area?:string|undefined;
  Nom_Area:string;

}

