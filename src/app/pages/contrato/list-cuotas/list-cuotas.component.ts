import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-list-cuotas',
  templateUrl: './list-cuotas.component.html',
  styleUrls: ['./list-cuotas.component.css']
})
export class ListCuotasComponent implements OnInit {
@Output() messageEvent = new EventEmitter<string>();
acuerdoid!:string;
public totalCliente:any;
public totalCredito:any;
public total:any;
numcuota=0;
cuotacreditoid="";
fechacredito="";
valorfinancion="";
dataSource = new MatTableDataSource<cuota>();
dataSource2=new MatTableDataSource<cuota>();
public displayedColumns: string[] = [
  "numero",
  "fecha",
  "valor",
  "estado",
  "Acciones",
];
public displayedColumns2: string[] = [
  "numero",
  "fecha",
  "valor",
  "estado",
  "Acciones",
];
readonly width:string='300px';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef,
    private CuotaS: CuotaService,
    public dialog: MatDialog) {
     }
  ngOnInit(): void {
    /* console.log('componente hijo',this.acuerdoid)
    this.QueryCuotas(this.acuerdoid); */
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    var filteredData = this.dataSource.filteredData;
    this.totalCliente=filteredData.reduce((summ, v) => summ += parseInt(v.valor), 0);
  }
  OpenAdd(){
    const dialogoRef = this.dialog.open(FormCuotaComponent, {
      width: this.width,
      data: {cuotaid:"",acuerdo:this.acuerdoid, cuota:this.numcuota}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      console.log('luego de cerrar',this.acuerdoid)
      this.loadCuotas(this.acuerdoid,this.valorfinancion);
      this.messageEvent.emit();
    });
  }
  OpenEdit(id: any){
    const dialogoRef = this.dialog.open(FormCuotaComponent, {
      width: this.width,
      data: {cuotaid:id.toString(),acuerdo:this.acuerdoid, cuota:"" }
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.loadCuotas(this.acuerdoid,this.valorfinancion);
      this.messageEvent.emit();
    });
  }
  OpenAporteCuota(Cuota: any){
    const dialogoRef = this.dialog.open(FormAporteComponent, {
      width: this.width,
      data: {aporteid:"",numaporte:"" , acuerdo:Cuota.idcontrato}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.loadCuotas(this.acuerdoid,this.valorfinancion);
    });
  }
  loadCuotas(idacuerdo:any,valorCredito: any){
    this.acuerdoid=idacuerdo;
    this.valorfinancion=valorCredito;
    this.QueryCuotas(this.acuerdoid);
    this.QueryCuotasCredito(idacuerdo);
  }
  QueryCuotas(idacuerdo:any){
    try{
      this.CuotaS.getCuotasAcuerdo(idacuerdo).subscribe((res:cuota[])=>{
        if (res[0].TIPO ==undefined && res[0].MENSAJE == undefined){
          this.dataSource.data = res;
          this.changeDetectorRefs.detectChanges();
          this.totalCliente=res.reduce((summ, v) => summ += parseInt(v.valor), 0);
          this.numcuota=this.dataSource.data.length;
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
  QueryCuotasCredito(idacuerdo:any){
    try{
      this.CuotaS.getCuotasAcuerdoCredito(idacuerdo).subscribe((res:cuota[])=>{
        if(res[0] != undefined){
          if (res[0].TIPO ==undefined && res[0].MENSAJE == undefined){
            this.dataSource2.data = res;
            this.cuotacreditoid=res[0].id;
            this.fechacredito=res[0].fecha;
            this.totalCredito=res.reduce((summ, v) => summ += parseInt(v.valor), 0);
            this.changeDetectorRefs.detectChanges();
          } else {
            this.notificacion(res[0].MENSAJE!);
          }
        }else{
          this.SaveCuotaCredito(this.valorfinancion);
        }
        this.total=this.totalCliente+this.totalCredito;
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
  SaveCuotaCredito(credito: any) {
    try {
      console.log("valido cuota",this.cuotacreditoid)

      let numberocuota=this.numcuota+1;
      if (this.cuotacreditoid == undefined ||this.cuotacreditoid == "") {
        var fecha = Date.now();
        this.fechacredito = moment(fecha).format( "YYYY-MM-DD");
        let cuota = {id:'',numero:numberocuota.toString(), valor:credito,fecha:this.fechacredito, responsable:"CREDITO",estado:'', acuerdoid:this.acuerdoid};
        this.CuotaS.createCuota(cuota).subscribe(
          (res: cuota[]) => {
            console.log(res);
            if (res[0].TIPO == "3") {
            } else {
            }
          },
          (err) => {
            this.notificacion(
              "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
            );
          }
        );
      } else {
        this.fechacredito = moment(this.fechacredito).format( "YYYY-MM-DD");
        let cuota = {id:this.cuotacreditoid,numero:numberocuota.toString(), valor:credito,fecha:this.fechacredito, responsable:"",estado:'', acuerdoid:this.acuerdoid};
        this.CuotaS.updateCuota(cuota).subscribe(
          (res: cuota[]) => {
            if (res[0].TIPO == "3") {
            } else {
            }
          },
          (err) => {
            this.notificacion(
              "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
            );
          }
        );
      }
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  RemoveCuota(Cuota: cuota) {
    const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
      width: "300px",
    });
    dialogoRef.afterClosed().subscribe((res) => {
      if (res) {
        try {
          this.CuotaS.deleteCuota(Cuota).subscribe(
            (res: cuota[]) => {
              if (res[0].TIPO == "3") {
                this.notificacion(res[0].MENSAJE!);
                this.QueryCuotas(this.acuerdoid);
                this.messageEvent.emit();
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
