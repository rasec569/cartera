import { BrowserModule } from "@angular/platform-browser";
import { NgModule,LOCALE_ID } from "@angular/core";
import localeEs from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";
import { ClientsComponent } from './views/admin/clients/clients.component';

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

// components for views and layouts

import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";

//Modulos De cliente
import{JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import{HttpClientModule, HTTP_INTERCEPTORS}from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './components/modals/Util/logout.component';
import { CardClientListComponent } from './components/cards/card-client-list/card-client-list.component';
import { AlertModule } from "./components/_alert";
import { CardRolListComponent } from "./components/cards/card-rol-list/card-rol-list.component";
import { UserComponent } from "./views/admin/user/user.component";
import { CardUserListComponent } from './components/cards/card-user-list/card-user-list.component';
import { CardAreaListComponent } from './components/cards/card-area-list/card-area-list.component';
import { CardProyectListComponent } from './components/cards/card-proyect-list/card-proyect-list.component';
import { ProyectsComponent } from './views/admin/proyects/proyects.component';
import { InmueblesComponent } from './views/admin/inmuebles/inmuebles.component';
import { CardInmueblesListComponent } from './components/cards/card-inmuebles-list/card-inmuebles-list.component';
import { CardEtapaListComponent } from './components/cards/card-etapa-list/card-etapa-list.component';
import { CardAdicionalListComponent } from "./components/cards/card-adicional-list/card-adicional-list.component";
import { CardFileComponent } from './components/cards/card-file/card-file.component';
import { CardClienteContratoComponent } from './components/cards/card-cliente-contrato/card-cliente-contrato.component';
import { CardClienteAcuerdoPagoComponent } from './components/cards/card-cliente-acuerdo-pago/card-cliente-acuerdo-pago.component';
import { CardAportesComponent } from './components/cards/card-aportes/card-aportes.component';
import { CardObligacionComponent } from './components/cards/card-obligacion/card-obligacion.component';
import { ClienteContratoComponent } from './views/admin/cliente-contrato/cliente-contrato.component';
import { ClienteAcuerdoPagoComponent } from './views/admin/cliente-acuerdo-pago/cliente-acuerdo-pago.component';
import { AportesComponent } from './views/admin/aportes/aportes.component';
import { FilesComponent } from './views/admin/files/files.component';
import { ObligacionesComponent } from './views/admin/obligaciones/obligaciones.component';
import { CardCostoComponent } from './components/cards/card-costo/card-costo.component';
import { CardAcreedorComponent } from './components/cards/card-acreedor/card-acreedor.component';
import { AcreedorComponent } from './views/admin/acreedor/acreedor.component';
import { CardEgresoComponent } from './components/cards/card-egreso/card-egreso.component';
import { CardCarteraComponent } from './components/cards/card-cartera/card-cartera.component';
import { CarteraComponent } from './views/admin/cartera/cartera.component';

registerLocaleData(localeEs,'es-CO');
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
    LogoutComponent,
    CardClientListComponent,
    CardRolListComponent,
    ClientsComponent,
    UserComponent,
    CardUserListComponent,
    CardAreaListComponent,
    CardProyectListComponent,
    ProyectsComponent,
    InmueblesComponent,
    CardInmueblesListComponent,
    CardEtapaListComponent,
    CardAdicionalListComponent,
    CardFileComponent,
    CardClienteContratoComponent,
    CardClienteAcuerdoPagoComponent,
    CardAportesComponent,
    CardObligacionComponent,
    ClienteContratoComponent,
    ClienteAcuerdoPagoComponent,
    AportesComponent,
    FilesComponent,
    ObligacionesComponent,
    CardCostoComponent,
    CardAcreedorComponent,
    AcreedorComponent,
    CardEgresoComponent,
    CardCarteraComponent,
    CarteraComponent
  ],
  imports: [BrowserModule, AppRoutingModule,
    HttpClientModule, FormsModule,
    AlertModule],
  providers: [
    // modal
    //JWT
    {provide:JWT_OPTIONS, useValue:JWT_OPTIONS},
    JwtHelperService,
    {provide: LOCALE_ID, useValue: 'es-CO'},
    //Token interceptor
    {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
