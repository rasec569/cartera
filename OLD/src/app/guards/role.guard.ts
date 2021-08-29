import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private autenticacionService:AutenticacionService,
    public router: Router
  ){}
  canActivate(route:ActivatedRouteSnapshot):boolean {
    const expecteRole=route.data.expecteRole;
    const token:any= localStorage.getItem('token');
    /* const { userName:any , roleId:any  } = decode(token);
    console.log(roleId); */


    return true;
  }

}
