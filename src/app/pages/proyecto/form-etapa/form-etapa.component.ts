import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { etapa } from "src/app/Models/etapa.model";
import { EtapaService } from "src/app/services/etapa.service";

@Component({
  selector: "app-form-etapa",
  templateUrl: "./form-etapa.component.html",
  styleUrls: ["./form-etapa.component.css"],
})
export class FormEtapaComponent implements OnInit {
  formEtapa: FormGroup;
  constructor(
    public EtapaS: EtapaService,
    public _snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogoRef: MatDialogRef<FormEtapaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formEtapa = this.fb.group({
      id: [""],
      numero: ["", Validators.required],
      manzanas: ["", Validators.required],
      estado: ["", Validators.required],
      idproyecto: ["", Validators.required],
    });
    if (data.etapaid !== "") {
      this.QueryOneEtapa(this.data.etapaid);
    }
  }

  ngOnInit(): void {

  }
  close() {
    this.dialogoRef.close();
  }
  SaveEtapa() {
    try {
      if (
        this.formEtapa.value.id == null ||
        this.formEtapa.value.id == ""
      ) {
        this.formEtapa.value.idproyecto = this.data.proyectoid;
        console.log("entro save etapa");
        this.EtapaS.createEtapa(this.formEtapa.value).subscribe(
          (res: etapa[]) => {
            console.log(res);
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formEtapa.reset();
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
        this.EtapaS.updateEtapa(this.formEtapa.value).subscribe(
          (res: etapa[]) => {
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formEtapa.reset();
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
  QueryOneEtapa(idetapa: any) {
    try {
      this.EtapaS.getEtapa(idetapa).subscribe(
        (res: etapa[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formEtapa.setValue(res[0]);
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
