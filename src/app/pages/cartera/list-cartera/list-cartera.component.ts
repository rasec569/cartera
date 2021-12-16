import { AfterViewInit, ViewChild, Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletevalidacionComponent } from 'src/app/shared/deletevalidacion/deletevalidacion.component';
import { MatDialog } from '@angular/material/dialog';

import { CarteraService } from 'src/app/services/cartera.service';
import { cartera } from 'src/app/Models/cartera.model';
import { DetalleCarteraComponent } from '../detalle-cartera/detalle-cartera.component';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { proyecto } from 'src/app/Models/proyecto.model';

@Component({
  selector: 'app-list-cartera',
  templateUrl: './list-cartera.component.html',
  styleUrls: ['./list-cartera.component.css']
})
export class ListCarteraComponent implements OnInit, AfterViewInit {
  public TotalContrato:any;
  public TotalRecaudado:any;
  public TotalAdicionales:any;
  public TotalRecaudadoAdicionales:any;
  public TotalSaldo:any;
  public Total:any;
  dataSource = new MatTableDataSource<cartera>();
  public DataProyectos!: any[];
  public displayedColumns: string[] = [
    // "identificacion",
    "cliente",
    "valor_contrato",
    "aportes_contrato",
    "valor_adicionales",
    "aportes_adicionales",
    "total",
    "estado",
    "Acciones",
  ];
  readonly width:string='900px';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,
    private CarteraS: CarteraService,
    private ProyectoS: ProyectoService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.QueryCartera();
    this.listarProyecto();

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    var filteredData = this.dataSource.filteredData;
    /* this.Total=filteredData.reduce((summ, v) => summ += parseInt(v.total), 0);
    this.TotalSaldo=filteredData.reduce((summ, v) => summ += parseInt(v.saldo), 0);
    this.TotalRecaudado=filteredData.reduce((summ, v) => summ += parseInt(v.recaudado), 0); */
  }
  QueryCartera() {
    try {
      this.CarteraS.getCartera().subscribe(
        (res: cartera[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.dataSource.data = res;
            this.changeDetectorRefs.detectChanges();
            this.TotalContrato=res.reduce((summ, v) => summ += parseInt(v.valor_contrato), 0);
            this.TotalRecaudado=res.reduce((summ, v) => summ += parseInt(v.aportes_contrato), 0);
            this.TotalAdicionales=res.reduce((summ, v) => summ += parseInt(v.valor_adicionales), 0);
            this.TotalRecaudadoAdicionales=res.reduce((summ, v) => summ += parseInt(v.aportes_adicionales), 0);
            this.Total=res.reduce((summ, v) => summ += parseInt(v.total), 0);
            console.log( 'Recaudo adicionales',this.TotalRecaudadoAdicionales)
            // this.TotalSaldo=res.reduce((summ, v) => summ += parseInt(v.saldo), 0);

            this.dataSource.sort = this.sort;
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
  QueryCarteraProyecto(idacuerdo:any){
    try{
      this.CarteraS.getCarteraProyecto(idacuerdo).subscribe((res:cartera[])=>{
        if(res[0]!=undefined){
          if (res[0].TIPO ==undefined && res[0].MENSAJE == undefined){
            this.dataSource.data = res;
            this.changeDetectorRefs.detectChanges();
            this.TotalContrato=res.reduce((summ, v) => summ += parseInt(v.valor_contrato), 0);
            this.TotalRecaudado=res.reduce((summ, v) => summ += parseInt(v.aportes_contrato), 0);
            this.TotalAdicionales=res.reduce((summ, v) => summ += parseInt(v.valor_adicionales), 0);
            this.TotalRecaudadoAdicionales=res.reduce((summ, v) => summ += parseInt(v.aportes_adicionales), 0);
            this.Total=res.reduce((summ, v) => summ += parseInt(v.total), 0);
            this.dataSource.sort = this.sort;
          } else {
            this.notificacion(res[0].MENSAJE!);
          }
        }
        else{
          this.dataSource.data = [];
          this.changeDetectorRefs.detectChanges();
          console.log("",this.dataSource.data.length);
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
  listarProyecto() {
    try {
      this.ProyectoS.getProyectos().subscribe(
        (res: proyecto[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.DataProyectos = res;
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
  onSelectProyecto(seleccion: any) {
    if(seleccion.value=== undefined){
      this.QueryCartera();
    }
    else{
      this.QueryCarteraProyecto(seleccion.value);
    }
  }
  OpenDetalle(id: any){
    const dialogoRef = this.dialog.open(DetalleCarteraComponent, { width: this.width,
      data: id, panelClass: 'my-dialog',});
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryCartera();
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
