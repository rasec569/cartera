import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletevalidacionComponent } from 'src/app/shared/deletevalidacion/deletevalidacion.component';
import { MatDialog } from '@angular/material/dialog';

import { ContratoService } from 'src/app/services/contrato.service';
import { contrato } from 'src/app/Models/contrato.model';
import { DetalleContratoComponent } from '../../contrato/detalle-contrato/detalle-contrato.component';
import { FormContratoClienteComponent } from '../../contrato/form-contrato-cliente/form-contrato-cliente.component';
import { FormContratoComponent } from '../../contrato/form-contrato/form-contrato.component';

@Component({
  selector: 'app-list-contratos-cliente',
  templateUrl: './list-contratos-cliente.component.html',
  styleUrls: ['./list-contratos-cliente.component.css']
})
export class ListContratosClienteComponent implements OnInit {
  @Input() clienteid!:string;
  dataSource = new MatTableDataSource<contrato>();
  public displayedColumns: string[] = [
    "numero",
    "forma_pago",
    "fecha",
    "valor",
    "valor_adicionales",
    "total",
    "Acciones",
  ];
  readonly width:string='900px';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef,
    private ContratoS: ContratoService,
    public dialog: MatDialog) { }

    ngOnInit(): void {
      this.QueryContratos(this.clienteid);
    }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;

    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    QueryContratos(clienteid:any) {
      try {
        this.ContratoS.getContratosCliente(clienteid).subscribe(
          (res: contrato[]) => {
            console.log(res);
            if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
              this.dataSource.data = res;
              this.changeDetectorRefs.detectChanges();
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
    OpenDetalle(id: any){
      const dialogoRef = this.dialog.open(DetalleContratoComponent, {
        width: this.width,
        data: {Contratoid:id}
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryContratos(this.clienteid);
      });
    }
     OpenAdd(){
      const dialogoRef = this.dialog.open(FormContratoClienteComponent, {
        width: this.width,
        data: {clienteid:this.clienteid}
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryContratos(this.clienteid);
      });
    }
    OpenEdit(id: any){
      const dialogoRef = this.dialog.open(FormContratoComponent, {
        width: this.width,
        data: {Contratoid:id}
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryContratos(this.clienteid);
      });
    }
    RemoveContrato(Contrato: contrato) {
      const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
        width: "300px",
      });
      dialogoRef.afterClosed().subscribe((res) => {
        if (res) {
          try {
            this.ContratoS.deleteContrato(Contrato).subscribe(
              (res: contrato[]) => {
                if (res[0].TIPO == "3") {
                  this.notificacion(res[0].MENSAJE!);
                  this.QueryContratos(this.clienteid);
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
