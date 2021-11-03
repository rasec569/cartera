import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AcreedorService } from "src/app/services/acreedor.service";
import { acreedor } from "src/app/Models/acreedor.model";

@Component({
  selector: "app-form-acreedor",
  templateUrl: "./form-acreedor.component.html",
  styleUrls: ["./form-acreedor.component.css"],
})
export class FormAcreedorComponent implements OnInit {
  acreedorid = "";
  formAcreedor: FormGroup;
  // expiación
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
  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private AcreedorS:AcreedorService,
  ) {
    this.formAcreedor = this.fb.group({
      idacreedor: [""],
      descripcion: ["", Validators.required],
      registrado: [""],
      modificado: [""],

      identificacion: ["", Validators.required],
      nombres: ["", Validators.required],
      apellidos: ["", Validators.required],
      correo: ["", Validators.required],
      telefono: ["", Validators.required],
      direccion: ["", Validators.required],



    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.acreedorid = params.id;
      console.log('inicio',params.id);
    });
    if(this.acreedorid != ""){
      this.QueryOneAcreedor(this.acreedorid);
    }
  }
  QueryOneAcreedor(acreedorid:any) {
    try {
      this.AcreedorS.getAcreedor(acreedorid).subscribe(
        (res: acreedor[]) => {
          console.log(res[0]);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formAcreedor.setValue(res[0]);
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
  SaveAcreedor() {
    console.log("entro id",this.formAcreedor.value.idacreedor);
    try {
      if((this.formAcreedor.value.idacreedor== null) ||(this.formAcreedor.value.idacreedor=="")){
        this.AcreedorS.createAcreedor(this.formAcreedor.value).subscribe(
          (res: acreedor[]) => {
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.formAcreedor.reset();
              this.router.navigate(['Obligaciones']);
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
        this.AcreedorS.updateAcreedor(this.formAcreedor.value).subscribe(
          (res: acreedor[]) => {
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.formAcreedor.reset();
              this.router.navigate(['Obligaciones']);
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
