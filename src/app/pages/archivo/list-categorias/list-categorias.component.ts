import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DeletevalidacionComponent } from "src/app/shared/deletevalidacion/deletevalidacion.component";

import { categoria } from 'src/app/Models/categoria.model';
import { categoriaService } from 'src/app/services/categoria.service';
import { FormCategoriaComponent } from '../form-categoria/form-categoria.component';

@Component({
  selector: 'app-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.css']
})
export class ListCategoriasComponent implements OnInit {
  dataSource = new MatTableDataSource<categoria>();
  public displayedColumns: string[] = [
    "nombre",
    "descripcion",
    "fecha",
    "Acciones"
  ]
  readonly width:string='300px';
@ViewChild(MatPaginator)
paginator!: MatPaginator;
@ViewChild(MatSort)
sort!: MatSort;
  constructor(public dialogoRef: MatDialogRef<ListCategoriasComponent>,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public CategoriaS:categoriaService) { }

  ngOnInit(): void {
    this.QueryCategorias();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    var filteredData = this.dataSource.filteredData;
  }
  close() {
    this.dialogoRef.close();
  }
  OpenAdd(){
    const dialogoRef = this.dialog.open(FormCategoriaComponent, {
      width: this.width,
      data: {categoriaid:""}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryCategorias();
    });
  }
  OpenEdit(id: any){
    const dialogoRef = this.dialog.open(FormCategoriaComponent, {
      width: this.width,
      data: {categoriaid:id}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryCategorias();
    });
  }
  QueryCategorias() {
    try {
      this.CategoriaS.getCategorias().subscribe(
        (res: categoria[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.dataSource.data = res;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
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
  RemoveCategoria(Categoria: categoria) {
    console.log("remove", Categoria);
    const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
      width: "300px",
    });
    dialogoRef.afterClosed().subscribe((res) => {
      if (res) {
        try {
          this.CategoriaS.deleteCategoria(Categoria).subscribe(
            (res: categoria[]) => {
              if (res[0].TIPO == "3") {
                this.notificacion(res[0].MENSAJE!);
                this.QueryCategorias();
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
