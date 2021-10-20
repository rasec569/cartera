import { Routes } from '@angular/router';
import { AutenticacionGuard } from '../guards/autenticacion.guard';
import { FormUserComponent } from './panel/panel-components/form-user/form-user.component';
import { PanelComponent } from './panel/panel.component';
import { InmuebleComponent } from './inmueble/inmueble.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ClienenteComponent } from './clienente/clienente.component';
import { AcreedoresComponent } from './acreedores/acreedores.component';
import { CarteraComponent } from './cartera/cartera.component';
import { FormProyectoComponent } from './proyecto/form-proyecto/form-proyecto.component';
import { FormEditProyectoComponent } from './proyecto/form-edit-proyecto/form-edit-proyecto.component';
import { FormInmuebleComponent } from './inmueble/form-inmueble/form-inmueble.component';


export const PagesRoutes: Routes = [
  { path: 'panel', component:PanelComponent, canActivate: [AutenticacionGuard] },
  { path:'newuser', component:FormUserComponent, canActivate: [AutenticacionGuard]},
  { path:'newuser/:id', component:FormUserComponent, canActivate: [AutenticacionGuard]},
  { path:'inmueble', component:InmuebleComponent, canActivate: [AutenticacionGuard]},
  { path:'newinmueble', component:FormInmuebleComponent, canActivate: [AutenticacionGuard]},
  { path:'newinmueble/:id', component:FormInmuebleComponent, canActivate: [AutenticacionGuard]},
  { path:'proyectos', component:ProyectoComponent, canActivate: [AutenticacionGuard]},
  { path:'newproyecto', component:FormProyectoComponent, canActivate: [AutenticacionGuard]},
  { path:'editproyecto/:id', component:FormEditProyectoComponent, canActivate: [AutenticacionGuard]},

  { path:'clientes', component:ClienenteComponent, canActivate: [AutenticacionGuard]},
  { path:'acreedores', component:AcreedoresComponent, canActivate: [AutenticacionGuard]},
  { path:'cartera', component:CarteraComponent, canActivate: [AutenticacionGuard]}

];
