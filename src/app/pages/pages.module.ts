import "hammerjs";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { DemoMaterialModule } from "../demo-material-module";
import { CdkTableModule } from "@angular/cdk/table";
import { MomentDateAdapter} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

import { PagesRoutes } from "./pages.routing";
import { PanelComponent } from "./panel/panel.component";
import { AreaComponent } from "./panel/panel-components/area/area.component";
import { RolComponent } from "./panel/panel-components/rol/rol.component";
import { FormUserComponent } from "./panel/panel-components/form-user/form-user.component";
import { UsersComponent } from "./panel/panel-components/users/users.component";
import { InmuebleComponent } from "./inmueble/inmueble.component";
import { ListInmueblesComponent } from "./inmueble/list-inmuebles/list-inmuebles.component";
import { ProyectoComponent } from "./proyecto/proyecto.component";
import { ListProyetoComponent } from "./proyecto/list-proyeto/list-proyeto.component";
import { ClienteComponent } from "./cliente/cliente.component";
import { ListClientesComponent } from "./cliente/list-clientes/list-clientes.component";
import { CarteraComponent } from "./cartera/cartera.component";
import { ArchivoComponent } from "./archivo/archivo.component";
import { ListAllFileComponent } from "./archivo/list-all-file/list-all-file.component";
import { ObligacionComponent } from "./obligacion/obligacion.component";
import { ListAcreedoresComponent } from "./obligacion/list-acreedores/list-acreedores.component";
import { ListCarteraComponent } from "./cartera/list-cartera/list-cartera.component";
import { FormProyectoComponent } from "./proyecto/form-proyecto/form-proyecto.component";
import { FormEditProyectoComponent } from "./proyecto/form-edit-proyecto/form-edit-proyecto.component";
import { DetalleProyectoComponent } from "./proyecto/detalle-proyecto/detalle-proyecto.component";
import { EtapaProyectoComponent } from "./proyecto/etapa-proyecto/etapa-proyecto.component";
import { InmuebleProyectoComponent } from "./proyecto/inmueble-proyecto/inmueble-proyecto.component";
import { FormEtapaComponent } from "./proyecto/form-etapa/form-etapa.component";
import { InmuenblesEtapaComponent } from "./proyecto/inmuenbles-etapa/inmuenbles-etapa.component";
import { FormInmuebleComponent } from "./inmueble/form-inmueble/form-inmueble.component";
import { DetalleInmuebleComponent } from "./inmueble/detalle-inmueble/detalle-inmueble.component";
import { CostosInmuebleComponent } from "./inmueble/costos-inmueble/costos-inmueble.component";
import { FormCostoComponent } from "./inmueble/form-costo/form-costo.component";
import { FormClienteComponent } from "./cliente/form-cliente/form-cliente.component";
import { UploadFileComponent } from "./archivo/upload-file/upload-file.component";
import { FormAcreedorComponent } from "./obligacion/form-acreedores/form-acreedor.component";
import { ListObligacionesComponent } from "./obligacion/list-obligaciones/list-obligaciones.component";
import { FormObligacionComponent } from "./obligacion/form-obligacion/form-obligacion.component";
import { AcreedorObligacionComponent } from "./obligacion/acreedor-obligacion/acreedor-obligacion.component";
import { DatePipe } from "@angular/common";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { ListContratosClienteComponent } from "./cliente/list-contratos-cliente/list-contratos-cliente.component";
import { DetalleClienteComponent } from "./cliente/detalle-cliente/detalle-cliente.component";
import { FormEgresoComponent } from "./obligacion/form-egreso/form-egreso.component";
import { ListEgresosObligacionComponent } from "./obligacion/list-egresos-obligacion/list-egresos-obligacion.component";
import { ListAdicionalesContratoComponent } from "./contrato/list-adicionales-contrato/list-adicionales-contrato.component";
import { DetalleContratoComponent } from "./contrato/detalle-contrato/detalle-contrato.component";
import { ListContratosComponent } from "./contrato/list-contratos/list-contratos.component";
import { ListAcuerdoPagoContratoComponent } from "./contrato/list-acuerdo-pago-contrato/list-acuerdo-pago-contrato.component";
import { ListCuotasComponent } from "./contrato/list-cuotas/list-cuotas.component";
import { ContratoComponent } from "./contrato/contrato.component";
import { FormCuotaComponent } from "./contrato/form-cuota/form-cuota.component";
import { FormAdicionalComponent } from "./contrato/form-adicional/form-adicional.component";
import { ListAportesAcuerdoComponent } from "./contrato/list-aportes-acuerdo/list-aportes-acuerdo.component";
import { FormAporteComponent } from "./contrato/form-aporte/form-aporte.component";
import { ListAportesAdicionalesComponent } from "./contrato/list-aportes-adicionales/list-aportes-adicionales.component";
import { DetalleAporteComponent } from "./contrato/detalle-aporte/detalle-aporte.component";
import { FormAporteAdicionalComponent } from './contrato/form-aporte-adicional/form-aporte-adicional.component';
import { ListAportesDetalleComponent } from './contrato/list-aportes-detalle/list-aportes-detalle.component';
import { FormCategoriaComponent } from './archivo/form-categoria/form-categoria.component';
import { ListCategoriasComponent } from './archivo/list-categorias/list-categorias.component';
import { FormContratoClienteComponent } from './contrato/form-contrato-cliente/form-contrato-cliente.component';
import { FormContratoComponent } from './contrato/form-contrato/form-contrato.component';
import { ListCuotaComponent } from './contrato/list-cuota/list-cuota.component';
import { DetalleCarteraComponent } from './cartera/detalle-cartera/detalle-cartera.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "DD/MM/YYYY",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
@NgModule({
  imports: [
    NgxMaskModule.forRoot(),
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
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe,
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
    ClienteComponent,
    ListClientesComponent,
    CarteraComponent,
    ArchivoComponent,
    ListAllFileComponent,
    ObligacionComponent,
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
    FormClienteComponent,
    UploadFileComponent,
    FormAcreedorComponent,
    ListObligacionesComponent,
    FormObligacionComponent,
    AcreedorObligacionComponent,
    ListContratosClienteComponent,
    DetalleClienteComponent,
    FormEgresoComponent,
    ListEgresosObligacionComponent,
    ListAdicionalesContratoComponent,
    DetalleContratoComponent,
    ListContratosComponent,
    ListAcuerdoPagoContratoComponent,
    ListCuotasComponent,
    ContratoComponent,
    FormCuotaComponent,
    FormAdicionalComponent,
    ListAportesAcuerdoComponent,
    FormAporteComponent,
    ListAportesAdicionalesComponent,
    DetalleAporteComponent,
    FormAporteAdicionalComponent,
    ListAportesDetalleComponent,
    FormCategoriaComponent,
    ListCategoriasComponent,
    FormContratoClienteComponent,
    FormContratoComponent,
    ListCuotaComponent,
    DetalleCarteraComponent,
  ],
})
export class PagesModule {}
