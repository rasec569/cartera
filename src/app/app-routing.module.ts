import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PrivadoComponent } from './components/privado/privado.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { RegistrarUserComponent } from './components/registrar-user/registrar-user.component';
import { ModificarUserComponent } from './components/modificar-user/modificar-user.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path:'inicio', component:InicioComponent},
  { path:'privado', component:PrivadoComponent, canActivate:[AutenticacionGuard]},
  { path:'nuevoUsuario', component:RegistrarUserComponent, canActivate:[AutenticacionGuard]},
  { path:'editarUsuario', component:ModificarUserComponent, canActivate:[AutenticacionGuard]},
  { path:'admin', component:AdminComponent, canActivate:[RoleGuard] ,data:{expecteRole:'0'}},
  { path: 'proyectos', component: ProyectosComponent, canActivate:[AutenticacionGuard]},
  { path: 'login', component: LoginComponent },
  { path:'**', pathMatch:'full', redirectTo:'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
