import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CostoService } from "src/app/services/costo.service";
import { costo } from "src/app/Models/costo.model";
import * as moment from "moment";
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-form-costo',
  templateUrl: './form-costo.component.html',
  styleUrls: ['./form-costo.component.css']
})
export class FormCostoComponent implements OnInit {
formCosto: FormGroup;
formattedDate:any;
  constructor(
    public CostoS: CostoService,
    public _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    public dialogoRef: MatDialogRef<FormCostoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.formCosto= this.fb.group({
      id: [""],
      concepto: ["", Validators.required],
      valor: ["", Validators.required],
      fecha: ["", Validators.required],
      idinmueble: ["", Validators.required],
    })
    console.log('id costo', data.costoid,'id inmueble', data.inmuebleid);
    if (data.costoid !== "") {
      this.QueryOneCosto(this.data.costoid);
    }
  }

  ngOnInit(): void {
  }
  close() {
    this.dialogoRef.close();
  }
  SaveCosto() {
    try {
      this.dateChange(this.formCosto.value.fecha)
      this.formCosto.value.idinmueble = this.data.inmuebleid;
        console.log('idinmueble', this.formCosto.value.fecha)
      if (
        this.formCosto.value.id == null ||
        this.formCosto.value.id == ""
      ) {
        console.log("entro save costo");
        this.CostoS.createCosto(this.formCosto.value).subscribe(
          (res: costo[]) => {
            console.log(res);
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formCosto.reset();
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
        this.CostoS.updateCosto(this.formCosto.value).subscribe(
          (res: costo[]) => {
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formCosto.reset();
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
  dateChange(fecha:any){
    const momentDate = new Date(fecha);
    this.formattedDate = moment(momentDate).format("YYYY/MM/DD");
    this.formCosto.value.fecha = this.formattedDate;
  }
  QueryOneCosto(idcosto: any) {
    try {
      this.CostoS.getCosto(idcosto).subscribe(
        (res: costo[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formCosto.patchValue(res[0]);
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
