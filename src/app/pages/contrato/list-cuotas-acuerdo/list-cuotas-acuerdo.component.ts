import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeletevalidacionComponent } from "src/app/shared/deletevalidacion/deletevalidacion.component";
import * as moment from "moment";

import { CuotaService } from 'src/app/services/cuota.service';
import { cuota } from 'src/app/Models/cuota.model';
import { FormCuotaComponent } from '../form-cuota/form-cuota.component';
import { FormAporteComponent } from '../form-aporte/form-aporte.component';
import { ListAportesDetalleComponent } from '../list-aportes-detalle/list-aportes-detalle.component';

@Component({
  selector: 'app-list-cuotas-acuerdo',
  templateUrl: './list-cuotas-acuerdo.component.html',
  styleUrls: ['./list-cuotas-acuerdo.component.css']
})
export class ListCuotasAcuerdoComponent implements OnInit {
  acuerdoid!:string;
public totalCliente:any;
public totalCredito:any;
public total:any;
public pagocliente:any;
public pagocredito:any;
numcuota=0;
cuotacreditoid="";
fechacredito="";
valorfinancion="";
  dataSource = new MatTableDataSource<cuota>();
  dataSource2=new MatTableDataSource<cuota>();
  public displayedColumns: string[] = [
    "fecha",
    "numero",
    "valor",
    "pagado",
    "estado",
    "Acciones",
  ];
  readonly SmallWidth:string='300px';
readonly MediunWidth:string='600px';
@ViewChild(MatPaginator)
paginator!: MatPaginator;
@ViewChild(MatSort)
sort!: MatSort;
constructor(private _snackBar: MatSnackBar,
  private CuotaS: CuotaService,
  public dialog: MatDialog) {
   }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  //filtrar por el contenido del la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    var filteredData = this.dataSource.filteredData;
    this.totalCliente=filteredData.reduce((summ, v) => summ += parseInt(v.valor), 0);
  }
  //Dialago form crear una cuota
  OpenAdd(){
    const dialogoRef = this.dialog.open(FormCuotaComponent, {
      width: this.SmallWidth,
      data: {cuotaid:"",acuerdo:this.acuerdoid, cuota:this.numcuota}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      console.log('luego de cerrar',this.acuerdoid)
      /* this.loadCuotas(this.acuerdoid,this.valorfinancion);
      this.messageEvent.emit(); */
    });
  }
  //Dialago form editar una cuota
  OpenEdit(id: any){
    const dialogoRef = this.dialog.open(FormCuotaComponent, {
      width: this.SmallWidth,
      data: {cuotaid:id.toString(),acuerdo:this.acuerdoid, cuota:"" }
    });
    dialogoRef.afterClosed().subscribe(res=>{
      /* this.loadCuotas(this.acuerdoid,this.valorfinancion);
      this.messageEvent.emit(); */
    });
  }
  //Dialago form Aportar a una cuota
  OpenAporteCuota(Cuota: any){
    console.log("Cuota", Cuota)
    const dialogoRef = this.dialog.open(FormAporteComponent, {
      width: this.SmallWidth,
      data: {aporteid:"",numaporte:"",cuota:Cuota, acuerdo:this.acuerdoid}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      /* this.loadCuotas(this.acuerdoid,this.valorfinancion); */
    });
  }
//aportes a la cuota seleccionada
OpenAportes(id: any){
  const dialogoRef = this.dialog.open(ListAportesDetalleComponent, {
    width: this.MediunWidth,
    data: {cuotaid:id,adicionalid:"0"}
  });
  dialogoRef.afterClosed().subscribe(res=>{
    /* this.loadCuotas(this.acuerdoid,this.valorfinancion); */
  });
}
//listar cuotas del cliente
QueryCuotas(idacuerdo:any){
  try{
    this.CuotaS.getCuotasAcuerdo(idacuerdo).subscribe((res:cuota[])=>{
      if( res[0] != undefined){
        if (res[0].TIPO ==undefined && res[0].MENSAJE == undefined){
          this.dataSource.data = res;
          /* this.changeDetectorRefs.detectChanges(); */
          this.totalCliente=res.reduce((summ, v) => summ += parseInt(v.valor), 0);
          this.pagocliente=res.reduce((summ, v) => summ += parseInt(v.pagado), 0);
          this.numcuota=this.dataSource.data.length;
        } else {
          this.notificacion(res[0].MENSAJE!);
        }
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
//Dialog Notificaciones
notificacion(Mensaje: string) {
  this._snackBar.open(Mensaje, "", {
    duration: 5000,
    horizontalPosition: "right",
    verticalPosition: "top",
    /* panelClass: ['mat-toolbar', 'mat-primary'], */
  });
}
}
