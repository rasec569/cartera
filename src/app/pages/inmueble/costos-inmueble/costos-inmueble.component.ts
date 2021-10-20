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
      console.log('inmueble', this.inmuebleid)
      this.QueryCostos(this.inmuebleid);
    }
    ngAfterViewInit() {
      this.dataSourceCosto.paginator = this.paginator;

    }
    getTotalCost() {
      

      /* return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0); */
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceCosto.filter = filterValue.trim().toLowerCase();
    }
    QueryCostos(inmuebleid:any) {
      try {

        this.CostoS.getCostosInmueble(inmuebleid).subscribe(
          (res: costo[]) => {
            console.log(res);
            if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
              this.dataSourceCosto.data = res;
              this.changeDetectorRefs.detectChanges();
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
    notificacion(Mensaje: string) {
      this._snackBar.open(Mensaje, "", {
        duration: 5000,
        horizontalPosition: "right",
        verticalPosition: "top",
        /* panelClass: ['mat-toolbar', 'mat-primary'], */
      });
    }

}
