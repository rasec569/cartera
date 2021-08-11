import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/Vistas/login/login.component';
import { PrivadoComponent } from './components/privado/privado.component';
import { ProyectosComponent } from './components/Vistas/Proyects/proyectos/proyectos.component';
import { RegistrarUserComponent } from './components/Vistas/Users//registrar-user/registrar-user.component';
import { ModificarUserComponent } from './components/Vistas/Users//modificar-user/modificar-user.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { RoleGuard } from './guards/role.guard';
import { UsuarioComponent } from './components/Vistas/Users//usuario/usuario.component';
import { RolesComponent } from './components/Vistas/Users//roles/roles.component';
import { RegistrarRolComponent } from './components/Vistas/Users//registrar-rol/registrar-rol.component';
import { ModicarRolComponent } from './components/Vistas/Users/modicar-rol/modicar-rol.component';
import { RegistrarProyectoComponent } from './components/Vistas/Proyects/registrar-proyecto/registrar-proyecto.component';
import { ModificarProyectoComponent } from './components/Vistas/Proyects/modificar-proyecto/modificar-proyecto.component';
import { InmueblesComponent } from './components/Vistas/Inmueble/inmuebles/inmuebles.component';
import { RegistrarInmuebleComponent } from './components/Vistas/Inmueble/registrar-inmueble/registrar-inmueble.component';
import { ModificarInmueblesComponent } from './components/Vistas/Inmueble/modificar-inmuebles/modificar-inmuebles.component';

const routes: Routes = [

  { path:'privado', component:PrivadoComponent, canActivate:[AutenticacionGuard]},
  { path:'admin', component:AdminComponent, canActivate:[RoleGuard] ,data:{expecteRole:'0'}},
  { path: 'login', component: LoginComponent },

  // Usuario
  { path:'Usuario', component:UsuarioComponent, canActivate:[AutenticacionGuard]},
  { path:'nuevoUsuario', component:RegistrarUserComponent, canActivate:[AutenticacionGuard]},
  { path:'editarUsuario/:id', component:ModificarUserComponent, canActivate:[AutenticacionGuard]},
  { path:'Roles', component:RolesComponent, canActivate:[AutenticacionGuard]},
  { path:'NuevoRol', component:RegistrarRolComponent, canActivate:[AutenticacionGuard]},
  { path:'EditarRol/:id', component:ModicarRolComponent, canActivate:[AutenticacionGuard]},

  //Proyecto
  { path: 'Proyectos', component: ProyectosComponent, canActivate:[AutenticacionGuard]},
  { path: 'NuevoProyecto', component: RegistrarProyectoComponent, canActivate:[AutenticacionGuard]},
  { path: 'EditarProyecto/:id', component: ModificarProyectoComponent, canActivate:[AutenticacionGuard]},
  //Inmueble
  { path: 'NuevoInmueble', component:RegistrarInmuebleComponent, canActivate:[AutenticacionGuard]},
  { path: 'Inmuebles', component: InmueblesComponent, canActivate:[AutenticacionGuard]},
  { path: 'EditarInmueble/:id', component: ModificarInmueblesComponent, canActivate:[AutenticacionGuard]},


  { path:'**', pathMatch:'full', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
