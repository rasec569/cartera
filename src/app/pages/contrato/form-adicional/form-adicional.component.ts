import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from "moment";

import { AdicionalService } from 'src/app/services/adicional.service';
import { adicional } from 'src/app/Models/adicional.model';

@Component({
  selector: 'app-form-adicional',
  templateUrl: './form-adicional.component.html',
  styleUrls: ['./form-adicional.component.css']
})
export class FormAdicionalComponent implements OnInit {
formAdicional: FormGroup;
  constructor(public _snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogoRef: MatDialogRef<FormAdicionalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public AdicionalS:AdicionalService) {
      this.formAdicional= this.fb.group({
        id: [""],
        concepto: ["", Validators.required],
        descripcion: ["", Validators.required],
        valor: ["", Validators.required],
        fecha: ["", Validators.required],
        contratoid: [""],
      });
      console.log("esto llega a form adicional",data);
      if(data.adicionalid!=""||data.adicionalid==undefined){
        this.QueryOneAdicional(data.adicionalid);
      }
      this.formAdicional.controls["contratoid"].setValue(data.contratoid);
    }

  ngOnInit(): void {
  }
  close() {
    this.dialogoRef.close();
  }
  SaveAdicional() {
    try {
      this.formAdicional.value.fecha = moment(this.formAdicional.value.fecha).format(
        "YYYY-MM-DD"
      );
      if (this.formAdicional.value.id == null || this.formAdicional.value.id == "") {
        console.log("entro save adicional");
        this.AdicionalS.createAdicional(this.formAdicional.value).subscribe(
          (res: adicional[]) => {
            console.log(res);
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formAdicional.reset();
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
        this.AdicionalS.updateAdicional(this.formAdicional.value).subscribe(
          (res: adicional[]) => {
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formAdicional.reset();
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
  QueryOneAdicional(idadicional: any) {
    try {
      console.log("entro a buscar");
      this.AdicionalS.getAdicional(idadicional).subscribe(
        (res: adicional[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formAdicional.patchValue(res[0]);
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
