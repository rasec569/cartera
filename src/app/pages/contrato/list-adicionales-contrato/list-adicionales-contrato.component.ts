import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeletevalidacionComponent } from "src/app/shared/deletevalidacion/deletevalidacion.component";

import { AdicionalService } from 'src/app/services/adicional.service';
import { adicional } from 'src/app/Models/adicional.model';
import { FormAdicionalComponent } from '../form-adicional/form-adicional.component';
import { FormAporteAdicionalComponent } from '../form-aporte-adicional/form-aporte-adicional.component';
import { ListAportesDetalleComponent } from '../list-aportes-detalle/list-aportes-detalle.component';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-list-adicionales-contrato',
  templateUrl: './list-adicionales-contrato.component.html',
  styleUrls: ['./list-adicionales-contrato.component.css']
})
export class ListAdicionalesContratoComponent implements OnInit {
  @Input() contratoid!:string;
  dataSource = new MatTableDataSource<adicional>();
  public total:any;
  public pagos:any;
  public displayedColumns: string[] = [
    "fecha",
    "concepto",
    "valor",
    "pagado",
    "estado",
    "Acciones",
  ];
  readonly width:string='350px';
  readonly MediunWidth:string='600px';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef,
    private AdicionalS: AdicionalService,
    public dialog: MatDialog,
    private ComunicacionS:ComunicacionService) { }

    ngOnInit(): void {
      this.QueryAdicionales(this.contratoid);
    }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      var filteredData = this.dataSource.filteredData;
      this.total=filteredData.reduce((summ, v) => summ += parseInt(v.valor), 0);
      this.pagos=filteredData.reduce((summ, v) => summ += parseInt(v.pagado), 0);
    }
    QueryAdicionales(contratoid:any) {
      try {
        this.AdicionalS.getAdicionalesContrato(contratoid).subscribe(
          (res: adicional[]) => {
            if (res[0] != undefined){
              if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
                this.dataSource.data = res;
                this.changeDetectorRefs.detectChanges();
                this.dataSource.sort = this.sort;
                this.total=res.reduce((summ, v) => summ += parseInt(v.valor), 0);
                this.pagos=res.reduce((summ, p) => summ += parseInt(p.pagado), 0);
                console.log("suma pagos",this.pagos )
              } else {
                this.notificacion(res[0].MENSAJE!);
              }
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
    // crear nuevo adicional
     OpenAdd(){
      const dialogoRef = this.dialog.open(FormAdicionalComponent, {
        width: this.width,
        data: {adicionalid:"", contratoid:this.contratoid}
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryAdicionales(this.contratoid);
      });
    }
    //editar un adicional
    OpenEdit(id: any){
      const dialogoRef = this.dialog.open(FormAdicionalComponent, {
        width: this.width,
        data: {adicionalid:id,contratoid:this.contratoid }
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryAdicionales(this.contratoid);
      });
    }
    // hacer aporte a un adicional
    OpenAporteAdicional(Adicional: any){
      const dialogoRef = this.dialog.open(FormAporteAdicionalComponent, {
        width: this.width,
        data: {aporteid:"",numaporte:"",adicional:Adicional,contratoid:""}
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryAdicionales(this.contratoid);
        this.ComunicacionS.CargarAportesAdicional$.emit();
      });
    }
    OpenAportes(id: any){
      const dialogoRef = this.dialog.open(ListAportesDetalleComponent, {
        width: this.MediunWidth,
        data: {cuotaid:0,adicionalid:id}
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryAdicionales(this.contratoid);
      });
    }
    RemoveAdicional(Adicional: adicional) {
      const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
        width: "300px",
      });
      dialogoRef.afterClosed().subscribe((res) => {
        if (res) {
          try {
            this.AdicionalS.deleteAdicional(Adicional).subscribe(
              (res: adicional[]) => {
                if (res[0].TIPO == "3") {
                  this.notificacion(res[0].MENSAJE!);
                  this.QueryAdicionales(this.contratoid);
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
