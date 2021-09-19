import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AutenticacionGuard } from "./guards/autenticacion.guard";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { ClientsComponent } from "./views/admin/clients/clients.component";
import { UserComponent } from "./views/admin/user/user.component";
import { ProyectsComponent } from "./views/admin/proyects/proyects.component";
import { InmueblesComponent } from "./views/admin/inmuebles/inmuebles.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { useAnimation } from "@angular/animations";

// components news
import { FilesComponent } from "./views/admin/files/files.component";
import { ClienteContratoComponent } from "./views/admin/cliente-contrato/cliente-contrato.component";
import { ClienteAcuerdoPagoComponent } from "./views/admin/cliente-acuerdo-pago/cliente-acuerdo-pago.component";
import { AportesComponent } from "./views/admin/aportes/aportes.component";
import { ObligacionesComponent } from "./views/admin/obligaciones/obligaciones.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent, canActivate: [AutenticacionGuard] },
      { path: "clients", component: ClientsComponent, canActivate: [AutenticacionGuard] },
      { path: "user", component: UserComponent, canActivate: [AutenticacionGuard] },
      { path: "proyects", component: ProyectsComponent, canActivate: [AutenticacionGuard] },
      { path: "inmuebles", component:InmueblesComponent, canActivate: [AutenticacionGuard]},
      { path: "files", component:FilesComponent, canActivate: [AutenticacionGuard]},
      { path: "cliente-contrato", component:ClienteContratoComponent, canActivate: [AutenticacionGuard]},
      { path: "cliente-acuerdo-pago", component:ClienteAcuerdoPagoComponent, canActivate: [AutenticacionGuard]},
      { path: "aportes", component:AportesComponent, canActivate: [AutenticacionGuard]},
      { path: "obligaciones", component:ObligacionesComponent, canActivate: [AutenticacionGuard]},
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
