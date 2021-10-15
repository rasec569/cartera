import { Component, Inject, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { ProyectoService } from 'src/app/services/proyecto.service';
import { proyecto } from 'src/app/Models/proyecto.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {
  proyectoid = "";
  dataSource = new MatTableDataSource<proyecto>();
  public displayedColumns: string[] = [
    "nombre",
    "ubicacion",
    "etapas",
    "estado",
  ];
  constructor(private _snackBar: MatSnackBar,
    private ProyectoS: ProyectoService,
    private route: ActivatedRoute,
    public dialogoRef: MatDialogRef<DetalleProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('esto trae al dialog', data);
      if (data != ""){
        this.proyectoid=data;
        this.QueryProyectos(data);
      }
    }

  ngOnInit(): void {
    /* this.route.params.subscribe((params: Params) => {
      this.proyectoid = params.id;
    });
    if(this.proyectoid != ""){
      this.QueryProyectos(this.proyectoid);
    } */
  }
  QueryProyectos(proyectoid:any) {
    try {
      this.ProyectoS.getProyectoDetalle(proyectoid).subscribe(
        (res: proyecto[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.dataSource.data = res;
          } else {
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"+err
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde! "+error
      );
    }
  }
  close() {
    this.dialogoRef.close();
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
