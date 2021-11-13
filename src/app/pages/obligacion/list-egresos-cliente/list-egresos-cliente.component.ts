import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DeletevalidacionComponent } from "src/app/shared/deletevalidacion/deletevalidacion.component";

import { EgresoService } from 'src/app/services/egreso.service';
import { egreso } from 'src/app/Models/egreso.model';
import { FormEgresoComponent } from '../form-egreso/form-egreso.component';

@Component({
  selector: 'app-list-egresos-cliente',
  templateUrl: './list-egresos-cliente.component.html',
  styleUrls: ['./list-egresos-cliente.component.css']
})

export class ListEgresosClienteComponent implements OnInit {
public total:any;
idobligacion = '';
dataSource = new MatTableDataSource<egreso>();
public displayedColumns: string[] = [
  "numero",
  "fecha",
  "referencia",
  "valor",
  "Acciones"
]
readonly width:string='300px';
@ViewChild(MatPaginator)
paginator!: MatPaginator;
@ViewChild(MatSort)
sort!: MatSort;
  constructor(private EgresoS:EgresoService,
    public dialogoRef: MatDialogRef<ListEgresosClienteComponent>,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data != ""){
        this.idobligacion=data.obligacionid;
        this.QueryEgresosCliente(this.idobligacion);
      }
    }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    var filteredData = this.dataSource.filteredData;
    this.total=filteredData.reduce((summ, v) => summ += parseInt(v.valor), 0);
  }
  close() {
    this.dialogoRef.close();
  }
  OpenAdd(){
    const dialogoRef = this.dialog.open(FormEgresoComponent, {
      width: this.width,
      data: {egresoid:"", obligacionid:this.idobligacion}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryEgresosCliente(this.idobligacion);
    });
  }
  OpenEdit(id: any){
    const dialogoRef = this.dialog.open(FormEgresoComponent, {
      width: this.width,
      data: {egresoid:id,obligacionid:this.idobligacion}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryEgresosCliente(this.idobligacion);
    });
  }
  QueryEgresosCliente(obligacionid:any) {
    try {
      this.EgresoS.getEgresosObligacion(obligacionid).subscribe(
        (res: egreso[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.dataSource.data = res;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.total=res.reduce((summ, v) => summ += parseInt(v.valor), 0);
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
  RemoveEgreso(Egreso: egreso) {
    const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
      width: "300px",
    });
    dialogoRef.afterClosed().subscribe((res) => {
      if (res) {
        try {
          this.EgresoS.deleteEgreso(Egreso).subscribe(
            (res: egreso[]) => {
              if (res[0].TIPO == "3") {
                this.notificacion(res[0].MENSAJE!);
                this.QueryEgresosCliente(this.idobligacion);
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
        } catch (notificacion) {
          this.notificacion(
            "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      }
    });
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
