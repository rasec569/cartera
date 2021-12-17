import { Component, Inject, OnInit} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

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
    public dialogoRef: MatDialogRef<FormProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
    if (data.proyectoid !== "") {
    // this.QueryOneEtapa(this.data.etapaid);
    }
  }

  ngOnInit(): void {

  }
  close() {
    this.dialogoRef.close();
  }
  SaveProyecto() {
    console.log("entro id",this.formProyecto.value.id);
    try {
        this.ProyectoS.createProyecto(this.formProyecto.value).subscribe(
          (res: proyecto[]) => {
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.formProyecto.reset();
              this.router.navigate(['Proyectos']);
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
