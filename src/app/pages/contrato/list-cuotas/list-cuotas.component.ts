import { ChangeDetectorRef, Component, EventEmitter,Input, OnChanges, SimpleChanges , OnInit, Output, ViewChild } from '@angular/core';
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
  selector: 'app-list-cuotas',
  templateUrl: './list-cuotas.component.html',
  styleUrls: ['./list-cuotas.component.css']
})
export class ListCuotasComponent implements OnInit,OnChanges {
@Output() messageEvent = new EventEmitter<string>();
@Input() idacuerdo!:string;
@Input() valorCredito!:string;
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
public displayedColumns2: string[] = [
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
    private changeDetectorRefs: ChangeDetectorRef,
    private CuotaS: CuotaService,
    public dialog: MatDialog) {
     }
  ngOnInit(): void {
    /* console.log('componente hijo',this.acuerdoid)
    this.QueryCuotas(this.acuerdoid); */
    console.log('LLega a listar cuotas')
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.idacuerdo!=undefined && this.valorCredito!=undefined){
      this.loadCuotas(this.idacuerdo,this.valorCredito);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    /* console.log("cambio", changes); */
    console.log("cambio", changes.valorCredito.currentValue);
    this.valorfinancion=changes.valorCredito.currentValue;
    this.SaveCuotaCredito(this.valorfinancion);
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
      console.log('luego de cerrar',this.acuerdoid,this.valorfinancion)
      this.loadCuotas(this.acuerdoid,this.valorfinancion);
      this.messageEvent.emit();
    });
  }
  //Dialago form editar una cuota
  OpenEdit(id: any){
    const dialogoRef = this.dialog.open(FormCuotaComponent, {
      width: this.SmallWidth,
      data: {cuotaid:id.toString(),acuerdo:this.acuerdoid, cuota:"" }
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.loadCuotas(this.acuerdoid,this.valorfinancion);
      this.messageEvent.emit();
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
      this.loadCuotas(this.acuerdoid,this.valorfinancion);
    });
  }
  //carga las cuotas del acuerdo de pago
  loadCuotas(idacuerdo:any,valorCredito: any){
    console.log("en el metodo de list cuota",idacuerdo,valorCredito)
    this.acuerdoid=idacuerdo;
    this.valorfinancion=valorCredito;
    this.QueryCuotas(idacuerdo);
    this.QueryCuotasCredito(idacuerdo);
  }
  //aportes a la cuota seleccionada
  OpenAportes(id: any){
    const dialogoRef = this.dialog.open(ListAportesDetalleComponent, {
      width: this.MediunWidth,
      data: {cuotaid:id,adicionalid:"0"}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.loadCuotas(this.acuerdoid,this.valorfinancion);
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
  //Listar cuotas del credito
  QueryCuotasCredito(idacuerdo:any){
    try{
      this.CuotaS.getCuotasAcuerdoCredito(idacuerdo).subscribe((res:cuota[])=>{
        if(res[0] != undefined){
          if (res[0]!= undefined && res[0].TIPO ==undefined && res[0].MENSAJE == undefined){
            this.dataSource2.data = res;
            this.cuotacreditoid=res[0].id;
            this.fechacredito=res[0].fecha;
            this.totalCredito=res.reduce((summ, v) => summ += parseInt(v.valor), 0);
            this.pagocredito=res.reduce((summ, v) => summ += parseInt(v.pagado), 0);
            this.changeDetectorRefs.detectChanges();
          } else {
            this.notificacion(res[0].MENSAJE!);
          }
        }
        if(this.dataSource.data.length<0){
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
  //Crear y actualizar cuota
  SaveCuotaCredito(credito: any) {
    try {
      console.log("valido cuota",this.cuotacreditoid.toString(),this.valorfinancion.toString());
      let numberocuota;
      console.log("numcuota",this.numcuota);
      if(this.numcuota==0){
        numberocuota=1;
      }else{
        numberocuota=this.numcuota+1;

      }
      if (this.cuotacreditoid.toString() == undefined ||this.cuotacreditoid.toString() == "") {
        var fecha = Date.now();
        this.fechacredito = moment(fecha).format( "YYYY-MM-DD");
        let cuota = {id:'',numero:numberocuota.toString(), valor:credito,fecha:this.fechacredito, responsable:"CREDITO",estado:'',pagado:"", acuerdoid:this.acuerdoid};
        this.CuotaS.createCuota(cuota).subscribe(
          (res: cuota[]) => {
            console.log("crea cuota",res);
            if (res[0].TIPO == "3") {
              this.QueryCuotasCredito(this.acuerdoid);
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
        let cuota = {id:this.cuotacreditoid,numero:numberocuota.toString(), valor:credito,fecha:this.fechacredito, responsable:"",estado:'',pagado:"", acuerdoid:this.acuerdoid};
        this.CuotaS.updateCuota(cuota).subscribe(
          (res: cuota[]) => {
            if (res[0].TIPO == "3") {
              this.QueryCuotasCredito(this.acuerdoid);
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
  //eliminar cuota
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
