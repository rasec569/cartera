import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {
  constructor(
    private autenticacionService:AutenticacionService,
    private router: Router
  ){  }

 /*  canActivate(route:ActivatedRouteSnapshot){
    this.router.navigate(['/login/']);
    return false;
  } */
  canActivate(): boolean {
    if(!this.autenticacionService.isAuth()){
      console.log('Token no es válido o expiró');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
