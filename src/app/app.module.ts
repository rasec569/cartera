import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PrivadoComponent } from './components/privado/privado.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUserComponent } from './components/registrar-user/registrar-user.component';

//Modulos
import { FormsModule } from '@angular/forms';
import{HttpClientModule, HTTP_INTERCEPTORS}from '@angular/common/http';
//Providers
import{JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';


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
    ProyectosComponent
  ],
  imports: [
    BrowserModule,
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
