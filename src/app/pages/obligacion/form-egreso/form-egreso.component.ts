import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as moment from "moment";

import { EgresoService } from 'src/app/services/egreso.service';
import { egreso } from 'src/app/Models/egreso.model';

@Component({
  selector: 'app-form-egreso',
  templateUrl: './form-egreso.component.html',
  styleUrls: ['./form-egreso.component.css']
})
export class FormEgresoComponent implements OnInit {
  formEgreso: FormGroup;
  constructor(public EgresoS:EgresoService,
    public _snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogoRef: MatDialogRef<FormEgresoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {
      this.formEgreso=this.fb.group({
        id: [""],
        numero: ["", Validators.required],
        fecha:["", Validators.required],
        referencia: ["", Validators.required],
        valor: ["", Validators.required],
        obligacionid: [""],
      });
      if(data.egresoid != ""){
        this.QueryOneEgreso(this.data.egresoid);
      }
        this.formEgreso.controls['obligacionid'].setValue(this.data.obligacionid);
      console.log('llego', data)
    }

  ngOnInit(): void {
  }
  close() {
    this.dialogoRef.close();
  }
  QueryOneEgreso(idegreso: any) {
    try {
      this.EgresoS.getEgreso(idegreso).subscribe(
        (res: egreso[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formEgreso.setValue(res[0]);
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
  SaveEgreso() {
    try {
      this.formEgreso.value.fecha =  moment(this.formEgreso.value.fecha).format("YYYY-MM-DD");
      if (
        this.formEgreso.value.id == null ||
        this.formEgreso.value.id == ""
      ) {
        console .log(this.formEgreso.value);
        this.EgresoS.createEgreso(this.formEgreso.value).subscribe(
          (res: egreso[]) => {
            console.log(res);
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formEgreso.reset();
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
        this.EgresoS.updateEgreso(this.formEgreso.value).subscribe(
          (res: egreso[]) => {
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formEgreso.reset();
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
