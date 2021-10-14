import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/services/user.service";
import { usuario } from "src/app/Models/usuario.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ProyectoService } from "src/app/services/proyecto.service";
import { proyecto } from "src/app/Models/proyecto.model";

@Component({
  selector: "app-form-proyecto",
  templateUrl: "./form-proyecto.component.html",
  styleUrls: ["./form-proyecto.component.css"],
})
export class FormProyectoComponent implements OnInit {
  formProyecto: FormGroup;
// expacion
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
    private ProyectoS:ProyectoService,
  ) {
    this.formProyecto = this.fb.group({
      id: [""],
      nombre: ["", Validators.required],
      ubicacion: ["", Validators.required],
      estado: ["", Validators.required],
      //etapa
      etapas: ["", Validators.required],
      manzanas: ["", Validators.required],
      estado_etapa: ["", Validators.required],
    });
  }

  ngOnInit(): void {

  }
  SaveProyecto() {
    console.log("entro id",this.formProyecto.value.id);
    try {
        this.ProyectoS.createProyecto(this.formProyecto.value).subscribe(
          (res: usuario[]) => {
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.formProyecto.reset();
              this.router.navigate(['proyectos']);
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