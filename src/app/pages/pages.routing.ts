import { Routes } from '@angular/router';
import { FormUserComponent } from './panel/panel-components/form-user/form-user.component';
import { PanelComponent } from './panel/panel.component';
import { InmuebleComponent } from './inmueble/inmueble.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ClienenteComponent } from './clienente/clienente.component';
import { AcreedoresComponent } from './acreedores/acreedores.component';
import { CarteraComponent } from './cartera/cartera.component';
import { FormProyectoComponent } from './proyecto/form-proyecto/form-proyecto.component';
import { FormEditProyectoComponent } from './proyecto/form-edit-proyecto/form-edit-proyecto.component';
import { DetalleProyectoComponent } from './proyecto/detalle-proyecto/detalle-proyecto.component';

export const PagesRoutes: Routes = [
  {  path: 'panel', component:PanelComponent },
  { path:'newuser', component:FormUserComponent},
  { path:'newuser/:id', component:FormUserComponent},
  { path:'inmueble', component:InmuebleComponent},
  { path:'proyectos', component:ProyectoComponent},
  { path:'newproyecto', component:FormProyectoComponent},
  { path:'editproyecto/:id', component:FormEditProyectoComponent},
  { path:'proyectodetalle/:id', component:DetalleProyectoComponent},

  { path:'clientes', component:ClienenteComponent},
  { path:'acreedores', component:AcreedoresComponent},
  { path:'cartera', component:CarteraComponent}

];
