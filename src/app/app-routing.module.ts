import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PrivadoComponent } from './components/privado/privado.component';
import { RegistrarUserComponent } from './components/registrar-user/registrar-user.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path:'inicio', component:InicioComponent},
  { path:'privado', component:PrivadoComponent, canActivate:[AutenticacionGuard]},
  { path:'nuevoUsuario', component:RegistrarUserComponent, canActivate:[AutenticacionGuard]},
  { path:'admin', component:AdminComponent, canActivate:[RoleGuard] ,data:{expecteRole:'0'}},
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuarioComponent },

  { path:'**', pathMatch:'full', redirectTo:'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
