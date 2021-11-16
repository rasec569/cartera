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

@Component({
  selector: 'app-list-adicionales-contrato',
  templateUrl: './list-adicionales-contrato.component.html',
  styleUrls: ['./list-adicionales-contrato.component.css']
})
export class ListAdicionalesContratoComponent implements OnInit {
  @Input() contratoid!:string;
  dataSource = new MatTableDataSource<adicional>();
  public total:any;
  public displayedColumns: string[] = [
    "concepto",
    "fecha",
    "valor",
    "estado",
    "Acciones",
  ];
  readonly width:string='350px';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef,
    private AdicionalS: AdicionalService,
    public dialog: MatDialog) { }

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
    }
    QueryAdicionales(contratoid:any) {
      try {
        this.AdicionalS.getAdicionalesContrato(contratoid).subscribe(
          (res: adicional[]) => {
            console.log(res);
            if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
              this.dataSource.data = res;
              this.changeDetectorRefs.detectChanges();
              this.dataSource.sort = this.sort;
              this.total=res.reduce((summ, v) => summ += parseInt(v.valor), 0);
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
     OpenAdd(){
      const dialogoRef = this.dialog.open(FormAdicionalComponent, {
        width: this.width,
        data: {adicionalid:"", contratoid:this.contratoid}
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryAdicionales(this.contratoid);
      });
    }
    OpenEdit(id: any){
      const dialogoRef = this.dialog.open(FormAdicionalComponent, {
        width: this.width,
        data: {adicionalid:id,contratoid:this.contratoid }
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