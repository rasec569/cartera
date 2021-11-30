import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ActivatedRoute ,Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ClientesService } from 'src/app/services/clientes.service';
import { cliente } from 'src/app/Models/cliente.model';

import { proyecto } from 'src/app/Models/proyecto.model';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { etapa} from 'src/app/Models/etapa.model';
import { EtapaService } from 'src/app/services/etapa.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { inmueble } from 'src/app/Models/inmueble.model';
import { ContratoService } from 'src/app/services/contrato.service';
import { contrato } from 'src/app/Models/contrato.model';
import { AcuerdoService } from 'src/app/services/acuerdo.service';
import { acuerdo } from 'src/app/Models/acuerdo.model';

import { ListCuotasComponent } from '../list-cuotas/list-cuotas.component';
import * as moment from 'moment';
@Component({
  selector: 'app-form-contrato-cliente',
  templateUrl: './form-contrato-cliente.component.html',
  styleUrls: ['./form-contrato-cliente.component.css']
})
export class FormContratoClienteComponent implements OnInit {
  isLinear = true;
  //formulario cliente
  clienteid='';
  contratoid='1';
  formCliente: FormGroup;
  public ListaClientes:cliente[]=[];
  public CloneClientes:cliente[]=[];
//formulario contrato
  formContrato: FormGroup;
  public DataProyectos!: any[];
  public DataEtapas!: any[];
  public DataInmuebles!: any[];
  // formulario acuerdo
  formAcuerdo: FormGroup;
  @ViewChild(ListCuotasComponent) hijo!:ListCuotasComponent;
  // expacion
  panelOpenState = false;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  constructor(private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ClienteS:ClientesService,
    private ContratoS:ContratoService,
    private ProyectoS: ProyectoService,
    private EtapaS: EtapaService,
    private InmuebleS: InmuebleService,
    private AcuerdoS:AcuerdoService,
    public dialogoRef: MatDialogRef<FormContratoClienteComponent>) {
      this.formCliente= this.fb.group({
        id: [""],
        identificacion: ["", Validators.required],
        nombres: ["", Validators.required],
        apellidos: ["", Validators.required],
        correo: [""],
        telefono: ["", Validators.required],
        direccion: ["", Validators.required],
      });
      this.formContrato= this.fb.group({
        id: [""],
        numero: ["", Validators.required],
        fecha: ["", Validators.required],
        forma_pago: ["", Validators.required],
        valor: ["", Validators.required],
        observacion: [""],
        clienteid: [""],
        inmuebleid: ["", Validators.required],
        idproyecto:["", Validators.required],
        idetapa: ["", Validators.required],
        entidad: [""],
      });
      this.formAcuerdo= this.fb.group({
        id: [""],
        aporte_cliente: ["", Validators.required],
        valor_credito: [""],
        valor_total: [""],
        entidad: [""],
        contratoid: [""],
      });
    }

  ngOnInit(): void {
    this.QuerClientes();
    this.listarProyecto();
    this.hijo.loadCuotas(this.contratoid,this.contratoid);
    this.hijo.QueryCuotasCredito(this.contratoid);
  }
  close() {
    this.dialogoRef.close();
  }
  //form cliente
  async filter(ev: any){
    const val = ev.target.value;
    console.log(val);
    if (val && val.trim() !== "") {
      this.ListaClientes = this.ListaClientes.filter((item) => {
        if(this.ListaClientes.length===1 && val==item.identificacion){
          this.QueryOneCliente(item.id);
        }
        return item.identificacion.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.ListaClientes = this.CloneClientes;
    }
  }
  clickseltec(event:any){
    this.QueryOneCliente(event.option.id.id);
  }
  QuerClientes() {
    try {
      this.ClienteS.getClientes().subscribe(
        (res: cliente[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.ListaClientes = res;
            this.CloneClientes=res;
            this.QueryOneAcuerdo(this.contratoid);
          } else {
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"+err
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde! "+error
      );
    }
  }
  QueryOneCliente(id:any) {
    try {
      console.log('entro a buscar');
      this.ClienteS.getCliente(id).subscribe(
        (res: cliente[]) => {
          console.log(res[0]);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formCliente.setValue(res[0]);
          } else {
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  SaveCliente() {
    try {
      console.log('entro a guardar');
      if((this.formCliente.value.id== null) ||(this.formCliente.value.id=="")){
        this.ClienteS.createCliente(this.formCliente.value).subscribe(
          (res: cliente[]) => {
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.clienteid=res[0].id;
            } else {
              this.notificacion(res[0].MENSAJE!);
            }
          },
          (err) => {
            this.notificacion(
              "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
            );
          }
        );
      }else{
        this.ClienteS.updateCliente(this.formCliente.value).subscribe(
          (res: cliente[]) => {
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.clienteid=res[0].id;
              console.log("clienteid", this.clienteid);
            } else {
              this.notificacion(res[0].MENSAJE!);
            }
          },
          (err) => {
            this.notificacion(
              "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
            );
          }
        );
      }
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  //form contrato
  listarProyecto(){
    try {
      this.ProyectoS.getProyectos().subscribe(
        (res:proyecto[])=> {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.DataProyectos=res;
          }else{
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  listarEtapa(id: any){
    try {
      this.EtapaS.getEtapasProyecto(id).subscribe(
        (res:etapa[])=> {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.DataEtapas=res;
          }else{
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  listarInmuebles(id: any){
    try {
      this.InmuebleS.getInmuebleEtapa(id).subscribe(
        (res:inmueble[])=> {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.DataInmuebles=res;
          }else{
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  QueryOneInmueble(inmuebleid:any) {
    try {
      this.InmuebleS.getInmueble(inmuebleid).subscribe(
        (res: inmueble[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.listarEtapa(res[0].idproyecto);
            this.formContrato.controls['valor'].setValue(res[0].Valor_Final);
          } else {
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  SaveContrato() {
    try {
      this.formContrato.value.clienteid=this.clienteid;
      this.formContrato.value.fecha = moment(this.formContrato.value.fecha).format(
        "YYYY-MM-DD"
      );
        console.log("entro save Contrato",this.formContrato.value);
        this.ContratoS.createContrato(this.formContrato.value).subscribe(
          (res: contrato[]) => {
            console.log(res);
            if (res[0].TIPO == "3") {
              this.contratoid=res[0].id;
              this.notificacion(res[0].MENSAJE!);
            } else {
              this.notificacion(res[0].MENSAJE!);
            }
          },
          (err) => {
            this.notificacion(
              "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
            );
          }
        );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  onSelectProyecto(seleccion:any){
    this.listarEtapa(seleccion.value);
  }
  onSelectEtapa(seleccion:any){
    this.listarInmuebles(seleccion.value);
  }
  onSelectInmueble(seleccion:any){
    this.QueryOneInmueble(seleccion.value)
    //this.formContrato.controls['valor'].setValue(seleccion.id.valor);
  }
  // formAcuerdo
  QueryOneAcuerdo(contratoid:any) {
    try {
      this.AcuerdoS.getAcuerdosContrato(contratoid).subscribe(
        (res: acuerdo[]) => {
          console.log(res[0]);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formAcuerdo.setValue(res[0]);
            console.log("en metodo")

          } else {
            this.notificacion(res[0].MENSAJE!);

          }
        },
        (err) => {
          this.notificacion(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  receiveMessage($event: any) {
    console.log($event);
    this.QueryOneAcuerdo(this.contratoid);
  }
  notificacion(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }
}
