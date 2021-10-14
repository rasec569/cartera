import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/services/user.service";
import { usuario } from "src/app/Models/usuario.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ProyectoService } from "src/app/services/proyecto.service";
import { proyecto } from "src/app/Models/proyecto.model";

@Component({
  selector: 'app-form-edit-proyecto',
  templateUrl: './form-edit-proyecto.component.html',
  styleUrls: ['./form-edit-proyecto.component.css']
})
export class FormEditProyectoComponent implements OnInit {
  proyectoid = "";
  formProyecto: FormGroup;
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
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.proyectoid = params.id;
    });
    if(this.proyectoid != ""){
      this.QueryOneProyecto(this.proyectoid);
    }
  }
  QueryOneProyecto(proyectoid:any) {
    try {
      this.ProyectoS.getProyecto(proyectoid).subscribe(
        (res: usuario[]) => {
          console.log("consultar proyecto ",res[0]);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formProyecto.setValue(res[0]);
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
  SaveProyecto() {
    console.log("entro id",this.formProyecto.value.id);
    try {
        this.ProyectoS.updateProyecto(this.formProyecto.value).subscribe(
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
