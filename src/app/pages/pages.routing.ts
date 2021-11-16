import { Routes } from '@angular/router';
import { AutenticacionGuard } from '../guards/autenticacion.guard';
import { FormUserComponent } from './panel/panel-components/form-user/form-user.component';
import { PanelComponent } from './panel/panel.component';
import { InmuebleComponent } from './inmueble/inmueble.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ObligacionComponent } from './obligacion/obligacion.component';
import { CarteraComponent } from './cartera/cartera.component';
import { FormProyectoComponent } from './proyecto/form-proyecto/form-proyecto.component';
import { FormEditProyectoComponent } from './proyecto/form-edit-proyecto/form-edit-proyecto.component';
import { FormInmuebleComponent } from './inmueble/form-inmueble/form-inmueble.component';
import { FormClienteComponent } from './cliente/form-cliente/form-cliente.component';
import { ArchivoComponent } from './archivo/archivo.component';
import { UploadFileComponent } from './archivo/upload-file/upload-file.component';
import { ContratoComponent } from './contrato/contrato.component';


export const PagesRoutes: Routes = [
  //Panel
  { path: 'Panel', component:PanelComponent, canActivate: [AutenticacionGuard] },
  { path:'Usuario/Nuevo', component:FormUserComponent, canActivate: [AutenticacionGuard]},
  { path:'Usuario/Editar/:id', component:FormUserComponent, canActivate: [AutenticacionGuard]},
  //Inmuebles
  { path:'Inmuebles', component:InmuebleComponent, canActivate: [AutenticacionGuard]},
  { path:'Inmuebles/Nuevo', component:FormInmuebleComponent, canActivate: [AutenticacionGuard]},
  { path:'Inmuebles/Editar/:id', component:FormInmuebleComponent, canActivate: [AutenticacionGuard]},
  //Proyectos
  { path:'Proyectos', component:ProyectoComponent, canActivate: [AutenticacionGuard]},
  { path:'Proyectos/Nuevo', component:FormProyectoComponent, canActivate: [AutenticacionGuard]},
  { path:'Proyectos/Editar/:id', component:FormEditProyectoComponent, canActivate: [AutenticacionGuard]},
  //Clientes
  { path:'Clientes', component:ClienteComponent, canActivate: [AutenticacionGuard]},
  { path:'Clientes/Nuevo', component:FormClienteComponent, canActivate: [AutenticacionGuard]},
  { path:'Clientes/Editar/:id', component:FormClienteComponent, canActivate: [AutenticacionGuard]},
  //Obligaciones
  { path:'Obligaciones', component:ObligacionComponent, canActivate: [AutenticacionGuard]},
  //Ventas
  { path:'Contratos', component:ContratoComponent, canActivate: [AutenticacionGuard]},
  //Archivos
  { path:'Archivos', component:ArchivoComponent, canActivate: [AutenticacionGuard]},
  { path:'Upload', component:UploadFileComponent, canActivate: [AutenticacionGuard]},
  //Cartera
  { path:'Cartera', component:CarteraComponent, canActivate: [AutenticacionGuard]}
];
