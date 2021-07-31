import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PrivadoComponent } from './components/privado/privado.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { RegistrarUserComponent } from './components/VistaUsers/registrar-user/registrar-user.component';
import { ModificarUserComponent } from './components/modificar-user/modificar-user.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { RoleGuard } from './guards/role.guard';
import { UsuarioComponent } from './components/VistaUsers/usuario/usuario.component';
import { RolesComponent } from './components/VistaUsers/roles/roles.component';
import { RegistrarRolComponent } from './components/VistaUsers/registrar-rol/registrar-rol.component';
import { ModicarRolComponent } from './components/VistaUsers/modicar-rol/modicar-rol.component';

const routes: Routes = [
  { path:'inicio', component:InicioComponent},
  { path:'privado', component:PrivadoComponent, canActivate:[AutenticacionGuard]},

  { path:'admin', component:AdminComponent, canActivate:[RoleGuard] ,data:{expecteRole:'0'}},
  { path: 'proyectos', component: ProyectosComponent, canActivate:[AutenticacionGuard]},
  { path: 'login', component: LoginComponent },

  // Usuarios
  { path:'Usuario', component:UsuarioComponent, canActivate:[AutenticacionGuard]},
  { path:'nuevoUsuario', component:RegistrarUserComponent, canActivate:[AutenticacionGuard]},
  { path:'editarUsuario', component:ModificarUserComponent, canActivate:[AutenticacionGuard]},
  { path:'Roles', component:RolesComponent, canActivate:[AutenticacionGuard]},
  { path:'nuevoRol', component:RegistrarRolComponent, canActivate:[AutenticacionGuard]},
  { path:'ModificarRol/:id', component:ModicarRolComponent, canActivate:[AutenticacionGuard]},



  { path:'**', pathMatch:'full', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
