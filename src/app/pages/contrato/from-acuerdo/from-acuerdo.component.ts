import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AcuerdoService } from 'src/app/services/acuerdo.service';
import { acuerdo } from 'src/app/Models/acuerdo.model';

@Component({
  selector: 'app-from-acuerdo',
  templateUrl: './from-acuerdo.component.html',
  styleUrls: ['./from-acuerdo.component.css']
})
export class FromAcuerdoComponent implements OnInit {
 formAcuerdo: FormGroup;
 acuerdo="";
  constructor(private _snackBar: MatSnackBar,
    private AcuerdoS: AcuerdoService,
    private fb: FormBuilder,
    public dialogoRef: MatDialogRef<FromAcuerdoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.formAcuerdo= this.fb.group({
        id: [""],
        entidad: [""],
        aporte_cliente: [""],
        contratoid: [""],
        valor_credito: [""],
      });
      if(data.acuerdoid!=""||data.acuerdoid==undefined){
        this.acuerdo= data.acuerdoid;
        this.QueryOneAcuerdo(data.acuerdoid);
      }

    }

  ngOnInit(): void {
  }
  close() {
    this.dialogoRef.close();
  }
  QueryOneAcuerdo(acuerdoid:any) {
    try {
      this.AcuerdoS.getAcuerdo(acuerdoid).subscribe(
        (res: acuerdo[]) => {
          console.log("un acuerdo",res[0])
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formAcuerdo.setValue(res[0]);
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
  SaveAcuerdo() {
    try {
      this.formAcuerdo.value.id = this.acuerdo;
        console.log('Guardando');
        this.AcuerdoS.updateAcuerdo(this.formAcuerdo.value).subscribe(
          (res: acuerdo[]) => {
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formAcuerdo.reset();
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
  notificacion(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }
}
