import { AfterViewInit, ViewChild, Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletevalidacionComponent } from 'src/app/shared/deletevalidacion/deletevalidacion.component';
import { MatDialog } from '@angular/material/dialog';

import { ProyectoService } from 'src/app/services/proyecto.service';
import { proyecto } from 'src/app/Models/proyecto.model';
import { DetalleProyectoComponent } from '../detalle-proyecto/detalle-proyecto.component';
import { FormProyectoComponent } from '../form-proyecto/form-proyecto.component';
import { FormEditProyectoComponent } from '../form-edit-proyecto/form-edit-proyecto.component';

@Component({
  selector: 'app-list-proyeto',
  templateUrl: './list-proyeto.component.html',
  styleUrls: ['./list-proyeto.component.css']
})
export class ListProyetoComponent implements OnInit,AfterViewInit {
  dataSource = new MatTableDataSource<proyecto>();
  public displayedColumns: string[] = [
    "nombre",
    "ubicacion",
    "etapas",
    "estado",
    "Acciones",
  ];
  readonly width:string='900px';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,
              private ProyectoS: ProyectoService,
              private changeDetectorRefs: ChangeDetectorRef,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.QueryProyectos();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  QueryProyectos() {
    try {
      this.ProyectoS.getProyectos().subscribe(
        (res: proyecto[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.dataSource.data = res;
            this.changeDetectorRefs.detectChanges();
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
  OpenDetalle(id: any){
    const dialogoRef = this.dialog.open(DetalleProyectoComponent, { width: this.width,
      data: id, panelClass: 'my-dialog',});
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryProyectos();
      });
  }
  OpenAdd(){
    const dialogoRef = this.dialog.open(FormProyectoComponent, {
      width: this.width,
      data: {proyectoid:"" }
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryProyectos();
    });
  }
  OpenEdit(id: any){
    const dialogoRef = this.dialog.open(FormEditProyectoComponent, {
      width: this.width,
      data: {proyectoid:id }
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryProyectos();
    });
  }
  RemoveProyecto(Proyecto:proyecto){
    const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
      width: "300px",
    });
    dialogoRef.afterClosed().subscribe((res) => {
      if (res) {
        try {
          this.ProyectoS.deleteProyecto(Proyecto).subscribe(
            (res: proyecto[]) => {
              if (res[0].TIPO == "3") {
                this.notificacion(res[0].MENSAJE!);
                this.QueryProyectos();
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
