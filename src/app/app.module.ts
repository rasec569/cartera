import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrivadoComponent } from './components/privado/privado.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUserComponent } from './components/VistaUsers/registrar-user/registrar-user.component';

//Modulos
import { FormsModule } from '@angular/forms';
import{HttpClientModule, HTTP_INTERCEPTORS}from '@angular/common/http';
//Providers
import{JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UsuarioComponent } from './components/VistaUsers/usuario/usuario.component';
import { NavbarComponent } from './components/Plantillas/navbar/navbar.component';
import { FooterComponent } from './components/Plantillas/footer/footer.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ModificarUserComponent } from './components/VistaUsers/modificar-user/modificar-user.component';
import { UsuariosComponent } from './components/VistaUsers/usuarios/usuarios.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RolesComponent } from './components/VistaUsers/roles/roles.component';
import { RegistrarRolComponent } from './components/VistaUsers/registrar-rol/registrar-rol.component';
import { ModicarRolComponent } from './components/VistaUsers/modicar-rol/modicar-rol.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PrivadoComponent,
    AdminComponent,
    LoginComponent,
    RegistrarUserComponent,
    UsuarioComponent,
    NavbarComponent,
    FooterComponent,
    ProyectosComponent,
    ModificarUserComponent,
    UsuariosComponent,
    RolesComponent,
    RegistrarRolComponent,
    ModicarRolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    //JWT
    {provide:JWT_OPTIONS, useValue:JWT_OPTIONS},
    JwtHelperService,
    //Token interceptor
    {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
