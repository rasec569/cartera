import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as moment from "moment";

import { ObligacionesService } from 'src/app/services/obligaciones.service';
import { obligacion } from 'src/app/Models/obligacion.model';

import { AcreedorService } from 'src/app/services/acreedor.service';
import { acreedor } from 'src/app/Models/acreedor.model';
import { FormAcreedorComponent } from '../form-acreedores/form-acreedor.component';

@Component({
  selector: 'app-form-obligacion',
  templateUrl: './form-obligacion.component.html',
  styleUrls: ['./form-obligacion.component.css']
})
export class FormObligacionComponent implements OnInit {
  formObligacion: FormGroup;

  public listaAcreedores:acreedor[] = [];
  public CloneAcreedores:acreedor[]=[];
  readonly width:string='750px';
  
  constructor(public ObligacionS: ObligacionesService,
    private AcreedorS:AcreedorService,
    public _snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogoRef: MatDialogRef<FormObligacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.formObligacion=this.fb.group({
        id: [""],
        fecha: ["", Validators.required],
        concepto:["", Validators.required],
        valor:["", Validators.required],
        interes:["", Validators.required],
        total:["", Validators.required],
        fecha_pago:["", Validators.required],
        idacreedor:[""],
        identificacion:["", Validators.required],
        nomacreedor:["", Validators.required],
      });
      console.log('ensayo',data);
      if(data.obligacionid != ""){
        this.QueryOneObligacion(this.data.obligacionid);
      }
    }
  ngOnInit(): void {
    console.log('esto trajo',this.data.obligacionid)
    if(this.data.obligacionid===""){

      this.QueryAcreedores();
    }
  }
  OpenFormacreedor(){
    const dialogoRef = this.dialog.open(FormAcreedorComponent, {
      width: this.width,
      data: {acreedorid:""}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryAcreedores();
    });
  }
  close() {
    this.dialogoRef.close();
  }
  filter(ev: any){
    const val = ev.target.value;
    console.log(val);
    if (val && val.trim() !== "") {
      this.listaAcreedores = this.listaAcreedores.filter((item) => {
        if(this.listaAcreedores.length===1){
          this.formObligacion.controls['identificacion'].setValue(item.identificacion);
          this.formObligacion.controls['nomacreedor'].setValue(item.nombres+" "+item.apellidos);
          this.formObligacion.controls['idacreedor']. setValue(item.idacreedor);
        }
        return item.identificacion.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.listaAcreedores = this.CloneAcreedores;
    }
  }
  clickseltec(event:any){
    this.formObligacion.controls['identificacion'].setValue(event.option.value);
    this.formObligacion.controls['nomacreedor'].setValue(event.option.id.nombres+' '+event.option.id.apellidos);
    this.formObligacion.controls['idacreedor']. setValue(event.option.id.idacreedor);

  }
  QueryAcreedores() {
    try {
      this.AcreedorS.getAcreedores().subscribe(
        (res: acreedor[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.listaAcreedores = res;
            console.log(res);
            this.CloneAcreedores=res;
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
  QueryOneObligacion(idobligacion: any) {
    try {
      this.ObligacionS.getObligacion(idobligacion).subscribe(
        (res: obligacion[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formObligacion.setValue(res[0]);
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
  SaveObligacion() {
    try {
      console.log("entro save");
      this.formObligacion.value.fecha =  moment(this.formObligacion.value.fecha).format("YYYY-MM-DD");
        this.formObligacion.value.fecha_pago =  moment(this.formObligacion.value.fecha_pago).format("YYYY-MM-DD");
      if (
        this.formObligacion.value.id == null ||
        this.formObligacion.value.id == ""
      ) {
        /* this.formObligacion.value.idproyecto = this.data.proyectoid; */
        console.log("entro save obligacion");
        this.ObligacionS.createObligacion(this.formObligacion.value).subscribe(
          (res: obligacion[]) => {
            console.log(res);
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formObligacion.reset();
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
        this.ObligacionS.updateObligacion(this.formObligacion.value).subscribe(
          (res: obligacion[]) => {
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formObligacion.reset();
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
  notificacion(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }
}
