import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';


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
