import "hammerjs";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { DemoMaterialModule } from "../demo-material-module";
import { CdkTableModule } from "@angular/cdk/table";
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

import { PagesRoutes } from "./pages.routing";
import { PanelComponent } from "./panel/panel.component";
import { AreaComponent } from "./panel/panel-components/area/area.component";
import { RolComponent } from "./panel/panel-components/rol/rol.component";
import { FormUserComponent } from "./panel/panel-components/form-user/form-user.component";
import { UsersComponent } from "./panel/panel-components/users/users.component";
import { InmuebleComponent } from './inmueble/inmueble.component';
import { ListInmueblesComponent } from './inmueble/list-inmuebles/list-inmuebles.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ListProyetoComponent } from './proyecto/list-proyeto/list-proyeto.component';
import { ClienenteComponent } from './clienente/clienente.component';
import { ListClientesComponent } from './clienente/list-clientes/list-clientes.component';
import { CarteraComponent } from './cartera/cartera.component';
import { ArchivoComponent } from './archivo/archivo.component';
import { ListAllFileComponent } from './archivo/list-all-file/list-all-file.component';
import { AcreedoresComponent } from './acreedores/acreedores.component';
import { ListAcreedoresComponent } from './acreedores/list-acreedores/list-acreedores.component';
import { ListCarteraComponent } from './cartera/list-cartera/list-cartera.component';
import { FormProyectoComponent } from './proyecto/form-proyecto/form-proyecto.component';
import { FormEditProyectoComponent } from './proyecto/form-edit-proyecto/form-edit-proyecto.component';
import { DetalleProyectoComponent } from './proyecto/detalle-proyecto/detalle-proyecto.component';
import { EtapaProyectoComponent } from './proyecto/etapa-proyecto/etapa-proyecto.component';
import { InmuebleProyectoComponent } from './proyecto/inmueble-proyecto/inmueble-proyecto.component';
import { FormEtapaComponent } from './proyecto/form-etapa/form-etapa.component';
import { InmuenblesEtapaComponent } from './proyecto/inmuenbles-etapa/inmuenbles-etapa.component';
import { FormInmuebleComponent } from "./inmueble/form-inmueble/form-inmueble.component";
import { DetalleInmuebleComponent } from './inmueble/detalle-inmueble/detalle-inmueble.component';
import { CostosInmuebleComponent } from "./inmueble/costos-inmueble/costos-inmueble.component";
import { FormCostoComponent } from './inmueble/form-costo/form-costo.component';
import { FormtInputMoneyDirective } from './formtInputMoney.directive';
import { FormClienteComponent } from './clienente/form-cliente/form-cliente.component';
import { UploadFileComponent } from './archivo/upload-file/upload-file.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  entryComponents: [],
  declarations: [
    PanelComponent,
    AreaComponent,
    RolComponent,
    FormUserComponent,
    UsersComponent,
    InmuebleComponent,
    ListInmueblesComponent,
    ProyectoComponent,
    ListProyetoComponent,
    ClienenteComponent,
    ListClientesComponent,
    CarteraComponent,
    ArchivoComponent,
    ListAllFileComponent,
    AcreedoresComponent,
    ListAcreedoresComponent,
    ListCarteraComponent,
    FormProyectoComponent,
    FormEditProyectoComponent,
    DetalleProyectoComponent,
    EtapaProyectoComponent,
    InmuebleProyectoComponent,
    FormEtapaComponent,
    InmuenblesEtapaComponent,
    FormInmuebleComponent,
    DetalleInmuebleComponent,
    CostosInmuebleComponent,
    FormCostoComponent,
      FormtInputMoneyDirective,
      FormClienteComponent,
      UploadFileComponent
   ],
})
export class PagesModule {}
