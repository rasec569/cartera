import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { ContratoService } from 'src/app/services/contrato.service';
import { contrato } from 'src/app/Models/contrato.model';
import { DetalleContratoComponent } from '../detalle-contrato/detalle-contrato.component';
import { FormContratoClienteComponent } from '../form-contrato-cliente/form-contrato-cliente.component';
import { FormContratoComponent } from '../form-contrato/form-contrato.component';


@Component({
  selector: 'app-list-contratos',
  templateUrl: './list-contratos.component.html',
  styleUrls: ['./list-contratos.component.css']
})
export class ListContratosComponent implements OnInit {
  dataSource = new MatTableDataSource<contrato>();
  public displayedColumns: string[] = [
    "fecha",
    "Casa",
    "numero",
    "forma_pago",
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
      this.QueryContratos();
    }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;

    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    QueryContratos() {
      try {
        this.ContratoS.getContratos().subscribe(
          (res: contrato[]) => {
            console.log(res);
            if(res[0] != undefined ){
              if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
                this.dataSource.data = res;
                this.changeDetectorRefs.detectChanges();
                this.dataSource.sort = this.sort;
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
    OpenDetalle(id: any){
      const dialogoRef = this.dialog.open(DetalleContratoComponent, {
        width: this.width,
        data: {Contratoid:id}
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryContratos();
      });
    }
    OpenAdd(){
      const dialogoRef = this.dialog.open(FormContratoClienteComponent, {
        width: this.width
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryContratos();
      });
    }
    OpenEdit(id: any){
      const dialogoRef = this.dialog.open(FormContratoComponent, {
        width: this.width,
        data: {Contratoid:id}
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryContratos();
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
