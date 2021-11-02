import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ObligacionesService } from 'src/app/services/obligaciones.service';
import { obligacion } from 'src/app/Models/obligacion.model';
import { DatePipe } from '@angular/common';
import * as moment from "moment";

@Component({
  selector: 'app-form-obligacion',
  templateUrl: './form-obligacion.component.html',
  styleUrls: ['./form-obligacion.component.css']
})
export class FormObligacionComponent implements OnInit {
  formObligacion: FormGroup;
  formattedDate:any;
  formattedDate2:any;
  constructor(public ObligacionS: ObligacionesService,
    public _snackBar: MatSnackBar,
    private fb: FormBuilder, private datePipe: DatePipe,
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
        idacreedor:["", Validators.required],
        acreedor:["", Validators.required],
      });
      console.log(data);
      if(data.obligacionid != ""){
        this.QueryOneObligacion(this.data.obligacionid);
      }
    }

  ngOnInit(): void {
  }
  close() {
    this.dialogoRef.close();
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
