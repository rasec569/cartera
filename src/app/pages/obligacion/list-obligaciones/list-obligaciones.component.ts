import {AfterViewInit,ViewChild, Component,OnInit,ChangeDetectorRef} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DeletevalidacionComponent } from "src/app/shared/deletevalidacion/deletevalidacion.component";
import { MatDialog } from "@angular/material/dialog";

import { ObligacionesService } from "src/app/services/obligaciones.service";
import { obligacion } from "src/app/Models/obligacion.model";
import { FormObligacionComponent } from "../form-obligacion/form-obligacion.component";
import { ListEgresosObligacionComponent } from "../list-egresos-obligacion/list-egresos-obligacion.component";
import { FormEgresoComponent } from "../form-egreso/form-egreso.component";

@Component({
  selector: "app-list-obligaciones",
  templateUrl: "./list-obligaciones.component.html",
  styleUrls: ["./list-obligaciones.component.css"],
})
export class ListObligacionesComponent implements OnInit,AfterViewInit {
  public total:any;
  acreedorid="";
  dataSource = new MatTableDataSource<obligacion>();
  public displayedColumns: string[] = [
    "acreedor",
    "concepto",
    "valor",
    "fecha",
    "fecha_pago",
    "Acciones",
  ];
  readonly width:string='700px';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(
    private _snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef,
    private ObligacionesS: ObligacionesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.QueryObligaciones();
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
  OpenAdd(){
    const dialogoRef = this.dialog.open(FormObligacionComponent, {
      width: this.width,
      data: {obligacionid:"",acreedorid:""}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryObligaciones();
    });
  }
  OpenAddEgreso(id: any){
    const dialogoRef = this.dialog.open(FormEgresoComponent, {
      width:'300px',
      data: {egresoid:"", obligacionid:id}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryObligaciones();
    });
  }
  OpenEgresos(id: any){
    const dialogoRef = this.dialog.open(ListEgresosObligacionComponent, {
      width: this.width,
      data: {obligacionid:id}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryObligaciones();
    });
  }
  OpenEdit(id: any, acreedor:any){
    const dialogoRef = this.dialog.open(FormObligacionComponent, {
      width: this.width,
      data: {obligacionid:id,acreedorid:acreedor}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryObligaciones();
    });
  }
  QueryObligaciones() {
    try {
      this.ObligacionesS.getObligaciones().subscribe(
        (res: obligacion[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.dataSource.data = res;
            this.changeDetectorRefs.detectChanges();
            this.total=res.reduce((summ, v) => summ += parseInt(v.valor), 0);
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
  RemoveObligacion(Obligacion: obligacion) {
    const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
      width: "300px",
    });
    dialogoRef.afterClosed().subscribe((res) => {
      if (res) {
        try {
          console.log("esto llega al metodo", Obligacion);
          this.ObligacionesS.deleteObligacion(Obligacion).subscribe(
            (res: obligacion[]) => {
              if (res[0].TIPO == "3") {
                this.notificacion(res[0].MENSAJE!);
                this.QueryObligaciones();
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
