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
import { FormClienteComponent } from './clienente/form-cliente/form-cliente.component';


export const PagesRoutes: Routes = [
  { path: 'Panel', component:PanelComponent, canActivate: [AutenticacionGuard] },
  { path:'NuevoUsuario', component:FormUserComponent, canActivate: [AutenticacionGuard]},
  { path:'EditarUsuario/:id', component:FormUserComponent, canActivate: [AutenticacionGuard]},
  { path:'Inmuebles', component:InmuebleComponent, canActivate: [AutenticacionGuard]},
  { path:'NuevoInmueble', component:FormInmuebleComponent, canActivate: [AutenticacionGuard]},
  { path:'EditarInmueble/:id', component:FormInmuebleComponent, canActivate: [AutenticacionGuard]},
  { path:'Proyectos', component:ProyectoComponent, canActivate: [AutenticacionGuard]},
  { path:'NuevoProyecto', component:FormProyectoComponent, canActivate: [AutenticacionGuard]},
  { path:'EditarProyecto/:id', component:FormEditProyectoComponent, canActivate: [AutenticacionGuard]},


  { path:'Clientes', component:ClienenteComponent, canActivate: [AutenticacionGuard]},
  { path:'NuevoCliente', component:FormClienteComponent, canActivate: [AutenticacionGuard]},
  { path:'EditarCliente/:id', component:FormClienteComponent, canActivate: [AutenticacionGuard]},

  { path:'Acreedores', component:AcreedoresComponent, canActivate: [AutenticacionGuard]},
  { path:'Cartera', component:CarteraComponent, canActivate: [AutenticacionGuard]}

];
