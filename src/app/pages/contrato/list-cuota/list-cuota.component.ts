import { Component, Input, OnInit,AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { CuotaService } from 'src/app/services/cuota.service';
import { cuota } from 'src/app/Models/cuota.model';
import { FormCuotaComponent } from '../form-cuota/form-cuota.component';
import { FormAporteComponent } from '../form-aporte/form-aporte.component';
import { ListAportesDetalleComponent } from '../list-aportes-detalle/list-aportes-detalle.component';

@Component({
  selector: 'app-list-cuota',
  templateUrl: './list-cuota.component.html',
  styleUrls: ['./list-cuota.component.css']
})
export class ListCuotaComponent implements OnInit, AfterViewInit {
  @Input() acuerdoid!:string;
  dataSource = new MatTableDataSource<cuota>();
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
  constructor(private _snackBar: MatSnackBar,
    private CuotaS: CuotaService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.QueryCuotas(this.acuerdoid);
    console.log("entro a cuota",this.acuerdoid);
  }
  OpenEdit(id: any){
    const dialogoRef = this.dialog.open(FormCuotaComponent, {
      width: this.SmallWidth,
      data: {cuotaid:id.toString(),acuerdo:this.acuerdoid, cuota:"" }
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryCuotas(this.acuerdoid);
    });
  }
  OpenAporteCuota(Cuota: any){
    console.log("Cuota", Cuota)
    const dialogoRef = this.dialog.open(FormAporteComponent, {
      width: this.SmallWidth,
      data: {aporteid:"",numaporte:"",cuota:Cuota, acuerdo:this.acuerdoid}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryCuotas(this.acuerdoid);
    });
  }
  //aportes a la cuota seleccionada
  OpenAportes(id: any){
    const dialogoRef = this.dialog.open(ListAportesDetalleComponent, {
      width: this.MediunWidth,
      data: {cuotaid:id,adicionalid:"0"}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryCuotas(this.acuerdoid);
    });
  }
  //listar cuotas del cliente
  QueryCuotas(idacuerdo:any){
    try{
      this.CuotaS.getCuotasAcuerdo(idacuerdo).subscribe((res:cuota[])=>{
        if (res[0].TIPO ==undefined && res[0].MENSAJE == undefined){
          this.dataSource.data = res;
          console.log("trajo",res)
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
