import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPopperjsModule} from 'ngx-popperjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivadoComponent } from './components/privado/privado.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/Vistas/login/login.component';
import { RegistrarUserComponent } from './components/Vistas/Users/registrar-user/registrar-user.component';

//Modulos
import { FormsModule } from '@angular/forms';
import{HttpClientModule, HTTP_INTERCEPTORS}from '@angular/common/http';
//Providers
import{JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UsuarioComponent } from './components/Vistas/Users//usuario/usuario.component';
import { NavbarComponent } from './components/Plantillas/navbar/navbar.component';
import { FooterComponent } from './components/Plantillas/footer/footer.component';
import { ProyectosComponent } from './components/Vistas/Proyects/proyectos/proyectos.component';
import { ModificarUserComponent } from './components/Vistas/Users//modificar-user/modificar-user.component';
import { UsuariosComponent } from './components/Vistas/Users//usuarios/usuarios.component';
import { RolesComponent } from './components/Vistas/Users//roles/roles.component';
import { RegistrarRolComponent } from './components/Vistas/Users//registrar-rol/registrar-rol.component';
import { ModicarRolComponent } from './components/Vistas/Users//modicar-rol/modicar-rol.component';
import { AreasComponent } from './components/Vistas/Users//areas/areas.component';
import { RegistrarProyectoComponent } from './components/Vistas/Proyects/registrar-proyecto/registrar-proyecto.component';
import { ModificarProyectoComponent } from './components/Vistas/Proyects/modificar-proyecto/modificar-proyecto.component';
import { RegistrarInmuebleComponent } from './components/Vistas/Inmueble/registrar-inmueble/registrar-inmueble.component';
import { InmueblesComponent } from './components/Vistas/Inmueble/inmuebles/inmuebles.component';
import { ModificarInmueblesComponent } from './components/Vistas/Inmueble/modificar-inmuebles/modificar-inmuebles.component';
import { RegistrarEtapaComponent } from './components/Vistas/Proyects/registrar-etapa/registrar-etapa.component';


@NgModule({
  declarations: [
    AppComponent,
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
    ModicarRolComponent,
    AreasComponent,
    RegistrarProyectoComponent,
    ModificarProyectoComponent,
    RegistrarInmuebleComponent,
    InmueblesComponent,
    ModificarInmueblesComponent,
    RegistrarEtapaComponent
  ],
  imports: [
    BrowserModule,
    NgxPopperjsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
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
