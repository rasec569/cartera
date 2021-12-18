import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ObligacionesService } from "src/app/services/obligaciones.service";
import { obligacion } from "src/app/Models/obligacion.model";

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.css']
})
export class StickerComponent implements OnInit, AfterViewInit {
  dataSourceVencidas = new MatTableDataSource<obligacion>();
  dataSourcePagar = new MatTableDataSource<obligacion>();
  public displayedColumns: string[] = [
    "acreedor",
    "valor",
    "fecha_pago",
    "Accion",
  ];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,private ObligacionesS: ObligacionesService) { }

  ngOnInit(): void {
    this.QueryObligacionesVencidas();
    this.QueryObligacionesPagar();
  }
  ngAfterViewInit() {
    this.dataSourceVencidas.paginator = this.paginator;
    this.dataSourceVencidas.sort = this.sort;
  }
  QueryObligacionesVencidas(){
    try{
      this.ObligacionesS.getObligacionesVencidas().subscribe((res:obligacion[])=>{
        if (res[0].TIPO ==undefined && res[0].MENSAJE == undefined){
          this.dataSourceVencidas.data = res;
          this.dataSourceVencidas.paginator = this.paginator;
          this.dataSourceVencidas.sort = this.sort;
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
  QueryObligacionesPagar(){
    try{
      this.ObligacionesS.getObligacionesPorPagar().subscribe((res:obligacion[])=>{
        if (res[0].TIPO ==undefined && res[0].MENSAJE == undefined){
          this.dataSourcePagar.data = res;
          this.dataSourcePagar.paginator = this.paginator;
          this.dataSourcePagar.sort = this.sort;
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
