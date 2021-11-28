import { Component, OnInit,Inject,AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ActivatedRoute ,Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { proyecto } from 'src/app/Models/proyecto.model';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { etapa} from 'src/app/Models/etapa.model';
import { EtapaService } from 'src/app/services/etapa.service';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { inmueble } from 'src/app/Models/inmueble.model';
import { ContratoService } from 'src/app/services/contrato.service';
import { contrato } from 'src/app/Models/contrato.model';
import * as moment from 'moment';
@Component({
  selector: 'app-form-contrato',
  templateUrl: './form-contrato.component.html',
  styleUrls: ['./form-contrato.component.css']
})
export class FormContratoComponent implements OnInit,AfterViewInit {
  formContrato: FormGroup;
  public DataProyectos!: any[];
  public DataEtapas!: any[];
  public DataInmuebles!: any[];
  adicionales=0;
  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private ContratoS:ContratoService,
    private ProyectoS: ProyectoService,
    private EtapaS: EtapaService,
    private InmuebleS: InmuebleService,
    public dialogoRef: MatDialogRef<FormContratoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formContrato= this.fb.group({
      id: [""],
      numero: ["", Validators.required],
      fecha: ["", Validators.required],
      forma_pago: ["", Validators.required],
      valor: ["", Validators.required],
      observacion: [""],
      valor_total: [""],
      clienteid: ["", Validators.required],
      inmuebleid: ["", Validators.required],
      idproyecto:[""],
      idetapa: [""],
      entidad: [""]

    });
    console.log("data", data)
    if(data.Contratoid!=""||data.Contratoid==undefined){
      this.QueryOneContrato(data.Contratoid);
    }
  }

  ngAfterViewInit() {
    this.listarProyecto();
  }
  ngOnInit(): void {

  }
  close() {
    this.dialogoRef.close();
  }
  SaveContrato() {
    try {
      this.formContrato.value.fecha = moment(this.formContrato.value.fecha).format(
        "YYYY-MM-DD"
      );
      if (this.formContrato.value.id == null || this.formContrato.value.id == "") {
        console.log("entro save Contrato");
        this.ContratoS.createContrato(this.formContrato.value).subscribe(
          (res: contrato[]) => {
            console.log(res);
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formContrato.reset();
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
      } else {
        this.formContrato.value.valor_total= this.formContrato.value.valor+this.adicionales
        console.log('Total',this.formContrato.value.valor_total);
        this.ContratoS.updateContrato(this.formContrato.value).subscribe(
          (res: contrato[]) => {
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formContrato.reset();
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
  QueryOneContrato(idcontrato: any) {
    try {
      this.ContratoS.getContrato(idcontrato).subscribe(
        (res: contrato[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formContrato.patchValue(res[0]);
            this.listarEtapa(res[0].idproyecto);
            this.adicionales=parseInt(res[0].valor_adicionales);
            this.listarInmuebles(res[0].idetapa);
          } else {
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          console.log("error",err);
          this.notificacion(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"

          );
        }
      );
    } catch (error) {
      console.log("error",error);
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }

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
  onSelectProyecto(seleccion:any){
    this.listarEtapa(seleccion.value);
    console.log("listarEtapa");
  }
  onSelectEtapa(seleccion:any){
    this.listarInmuebles(seleccion.value);
    console.log("listarEtapa");
  }
  onSelectInmueble(seleccion:any){
    this.QueryOneInmueble(seleccion.value)
    console.log("listarEtapa");
    //this.formContrato.controls['valor'].setValue(seleccion.id.valor);
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

