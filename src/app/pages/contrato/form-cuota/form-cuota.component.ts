import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from "moment";

import { cuota } from "src/app/Models/cuota.model";
import { CuotaService } from "src/app/services/cuota.service";

@Component({
  selector: "app-form-cuota",
  templateUrl: "./form-cuota.component.html",
  styleUrls: ["./form-cuota.component.css"],
})
export class FormCuotaComponent implements OnInit {
  formCuota: FormGroup;
  constructor(
    public _snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogoRef: MatDialogRef<FormCuotaComponent>,
    public CuotaS: CuotaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formCuota = this.fb.group({
      id: [""],
      numero: ["", Validators.required],
      valor: ["", Validators.required],
      fecha: ["", Validators.required],
      responsable: [""],
      acuerdoid: [""],
    });
    console.log("llego data",this.data);
    if (this.data.cuotaid === "") {
      if (this.data.cuota != 0) {
        this.formCuota.controls["numero"].setValue(this.data.cuota + 1);
      }else{
        this.formCuota.controls["numero"].setValue(1);
      }
    }else{
      this.QueryOneCuota(this.data.cuotaid);
    }
  }

  ngOnInit(): void {
  }
  close() {
    this.dialogoRef.close();
  }
  SaveCuota() {
    try {
      this.formCuota.value.fecha = moment(this.formCuota.value.fecha).format(
        "YYYY-MM-DD"
      );
      this.formCuota.value.responsable="CLIENTE";
      this.formCuota.value.acuerdoid = this.data.acuerdo;
      if (this.formCuota.value.id == null || this.formCuota.value.id == "") {
        console.log("entro save cuota");
        this.CuotaS.createCuota(this.formCuota.value).subscribe(
          (res: cuota[]) => {
            console.log(res);
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formCuota.reset();
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
        this.CuotaS.updateCuota(this.formCuota.value).subscribe(
          (res: cuota[]) => {
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formCuota.reset();
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
  QueryOneCuota(idcuota: any) {
    console.log("se activo")
    try {
      this.CuotaS.getCuota(idcuota).subscribe(
        (res: cuota[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formCuota.patchValue(res[0]);
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
  notificacion(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }
}
