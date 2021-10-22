import { AfterViewInit, ViewChild, Component, OnInit,ChangeDetectorRef, Input  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletevalidacionComponent } from 'src/app/shared/deletevalidacion/deletevalidacion.component';
import { MatDialog } from '@angular/material/dialog';

import { CostoService } from 'src/app/services/costo.service';
import { costo } from 'src/app/Models/costo.model';
import { FormCostoComponent } from '../form-costo/form-costo.component';

@Component({
  selector: 'app-costos-inmueble',
  templateUrl: './costos-inmueble.component.html',
  styleUrls: ['./costos-inmueble.component.css']
})

export class CostosInmuebleComponent implements OnInit {
  @Input() inmuebleid!:string;
  public total:any;
  dataSourceCosto= new MatTableDataSource<costo>();
  public displayedColumns: string[] = [
    "concepto",
    "valor",
    "fecha",
    "Acciones",
  ];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,
    private CostoS: CostoService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog) { }

    ngOnInit(): void {
      this.QueryCostos(this.inmuebleid);
    }
    ngAfterViewInit() {
      this.dataSourceCosto.paginator = this.paginator;

    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceCosto.filter = filterValue.trim().toLowerCase();
      var filteredData = this.dataSourceCosto.filteredData;
      this.total=filteredData.reduce((summ, v) => summ += parseInt(v.valor), 0);
    }
    QueryCostos(inmuebleid:any) {
      try {

        this.CostoS.getCostosInmueble(inmuebleid).subscribe(
          (res: costo[]) => {
            if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
              this.dataSourceCosto.data = res;
              this.changeDetectorRefs.detectChanges();
              this.total=res.reduce((summ, v) => summ += parseInt(v.valor), 0);
              this.dataSourceCosto.sort = this.sort;
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
      const dialogoRef = this.dialog.open(FormCostoComponent, {
        width: "300px",
        data: {etapaid:"",inmuebleid:this.inmuebleid }
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryCostos(this.inmuebleid);
      });
    }
    OpenEdit(id: any){
      const dialogoRef = this.dialog.open(FormCostoComponent, {
        width: "300px",
        data: {costoid:id,inmuebleid:this.inmuebleid }
      });
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryCostos(this.inmuebleid);
      });
    }
    OpenDelete(Costo:costo){
      const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
        width: "300px",
      });
      dialogoRef.afterClosed().subscribe((res) => {
        if (res) {
          try {
            this.CostoS.deleteCosto(Costo).subscribe(
              (res: costo[]) => {
                if (res[0].TIPO == "3") {
                  this.notificacion(res[0].MENSAJE!);
                  this.QueryCostos(this.inmuebleid);
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
