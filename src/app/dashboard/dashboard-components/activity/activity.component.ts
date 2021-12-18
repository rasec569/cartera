import { Component,ViewChild,AfterViewInit, OnInit } from '@angular/core';
import { Activity, activities } from './activity-data';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

import { CuotaService } from 'src/app/services/cuota.service';
import { cuota } from 'src/app/Models/cuota.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit,AfterViewInit {
  dataSourceVencidas = new MatTableDataSource<cuota>();
  dataSourcePagar = new MatTableDataSource<cuota>();

  public displayedColumnsVencidas: string[] = [
    "fecha",
    "numero",
    "valor",
    "responsable",
    "casa",
    "Acciones",
  ];
  public displayedColumnsPagar: string[] = [
    "fecha",
    "numero",
    "valor",
    "responsable",
    "Casa",
    "Acciones",
  ];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  activityData: Activity[];

  constructor(private CuotaS: CuotaService,
    private _snackBar: MatSnackBar,) {

    this.activityData = activities;
  }
  ngAfterViewInit() {
    this.dataSourceVencidas.paginator = this.paginator;
    this.dataSourceVencidas.sort = this.sort;
  }

  ngOnInit(): void {
    this.QueryCuotasVencidas();
    this.QueryCuotasPagar();
  }
  QueryCuotasVencidas(){
    try{
      this.CuotaS.getCuotasVencidas().subscribe((res:cuota[])=>{
        if (res[0].TIPO ==undefined && res[0].MENSAJE == undefined){
          this.dataSourceVencidas.data = res;
          console.log("trajo vencidas",res)
        } else {
          this.notificacion(res[0].MENSAJE!);
        }
      },(err) => {
        this.notificacion(
          "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!" +
            err
        );
      }
      );
    }catch (error){
      this.notificacion(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde! " +
          error
      );
    }
  }
  QueryCuotasPagar(){
    try{
      this.CuotaS.getCuotasPorPagar().subscribe((res:cuota[])=>{
        if (res[0].TIPO ==undefined && res[0].MENSAJE == undefined){
          this.dataSourcePagar.data = res;
          console.log("trajo por pagar",res)
        } else {
          this.notificacion(res[0].MENSAJE!);
        }
      },(err) => {
        this.notificacion(
          "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!" +
            err
        );
      }
      );
    }catch (error){
      this.notificacion(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde! " +
          error
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
