import { Routes } from '@angular/router';
import { FormUserComponent } from './panel/panel-components/form-user/form-user.component';
import { PanelComponent } from './panel/panel.component';
import { InmuebleComponent } from './inmueble/inmueble.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ClienenteComponent } from './clienente/clienente.component';
import { AcreedoresComponent } from './acreedores/acreedores.component';

export const PagesRoutes: Routes = [
  {  path: 'panel', component:PanelComponent },
  { path:'newuser', component:FormUserComponent},
  { path:'newuser/:id', component:FormUserComponent},
  { path:'inmueble', component:InmuebleComponent},
  { path:'proyectos', component:ProyectoComponent},
  { path:'clientes', component:ClienenteComponent},
  { path:'acreedores', component:AcreedoresComponent}

];
