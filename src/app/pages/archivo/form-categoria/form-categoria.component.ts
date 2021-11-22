import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { categoria } from 'src/app/Models/categoria.model';
import { categoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {
  formCategoria: FormGroup;
  constructor(public _snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogoRef: MatDialogRef<FormCategoriaComponent>,
    public CategoriaS:categoriaService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      this.formCategoria= this.fb.group({
        id: [""],
        nombre: ["", Validators.required],
        descripcion: ["", Validators.required],
      });
      if(data.categoriaid != ""||data.categoriaid==undefined){
        this.QueryOneCategoria(data.categoriaid);
      }
    }

  ngOnInit(): void {
  }

  close() {
    this.dialogoRef.close();
  }
  SaveCategoria() {
    try {
      if (this.formCategoria.value.id == null || this.formCategoria.value.id == "") {
          this.CategoriaS.createCategoria(this.formCategoria.value).subscribe(
            (res: categoria[]) => {
              console.log(res);
              if (res[0].TIPO == "3") {
                this.dialogoRef.close();
                this.notificacion(res[0].MENSAJE!);
                this.formCategoria.reset();
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
      }else {
        this.CategoriaS.updateCategoria(this.formCategoria.value).subscribe(
          (res: categoria[]) => {
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formCategoria.reset();
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
  QueryOneCategoria(idcategoria: any) {
    try {
      console.log("entro a buscar",idcategoria);
      this.CategoriaS.getCategoria(idcategoria).subscribe(
        (res: categoria[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formCategoria.patchValue(res[0]);
            console.log("res",res)
          } else {
            console.log("Error")
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
