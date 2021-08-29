import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {
  constructor(
    private autenticacionService:AutenticacionService,
    private router: Router
  ){  }

  canActivate(): boolean {
    if(!this.autenticacionService.isAuth()){
      console.log('Token no es válido o expiró');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
