import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PrivadoComponent } from './components/privado/privado.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path:'inicio', component:InicioComponent},
  { path:'privado', component:PrivadoComponent, canActivate:[AutenticacionGuard]},
  { path:'admin', component:AdminComponent, canActivate:[RoleGuard] ,data:{expecteRole:'0'}},
  { path: 'login', component: LoginComponent },
  { path:'**', pathMatch:'full', redirectTo:'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
