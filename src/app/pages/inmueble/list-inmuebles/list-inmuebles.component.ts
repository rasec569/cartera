import {
  AfterViewInit, ViewChild, Component, OnInit, ChangeDetectorRef} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DeletevalidacionComponent } from "src/app/shared/deletevalidacion/deletevalidacion.component";
import { MatDialog } from "@angular/material/dialog";

import { InmuebleService } from "src/app/services/inmueble.service";
import { inmueble } from "src/app/Models/inmueble.model";
import{DetalleInmuebleComponent} from "../detalle-inmueble/detalle-inmueble.component"

@Component({
  selector: "app-list-inmuebles",
  templateUrl: "./list-inmuebles.component.html",
  styleUrls: ["./list-inmuebles.component.css"],
})
export class ListInmueblesComponent implements OnInit {
  dataSource = new MatTableDataSource<inmueble>();
  public displayedColumns: string[] = [
    "Manzana",
    "Casa",
    "etapa",
    "proyecto",
    "Valor_Final",
    "estado",
    "Acciones",
  ];
  readonly width:string='900px';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(
    private _snackBar: MatSnackBar,
    private InmuebleS: InmuebleService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.QueryInmuebles();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  QueryInmuebles() {
    try {
      this.InmuebleS.getInmuebles().subscribe(
        (res: inmueble[]) => {
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
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!" +
              err
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde! " +
          error
      );
    }
  }
  OpenDetalle(id: any){
    const dialogoRef = this.dialog.open(DetalleInmuebleComponent , { width: this.width,
      data: id, panelClass: 'my-dialog',});
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryInmuebles();
      });
  }
  RemoveInmueble(Inmueble: inmueble) {
    const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
      width: "300px",
    });
    dialogoRef.afterClosed().subscribe((res) => {
      if (res) {
        try {
          this.InmuebleS.deleteInmueble(Inmueble).subscribe(
            (res: inmueble[]) => {
              if (res[0].TIPO == "3") {
                this.notificacion(res[0].MENSAJE!);
                this.QueryInmuebles();
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
