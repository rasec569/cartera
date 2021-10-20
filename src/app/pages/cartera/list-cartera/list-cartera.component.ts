import { AfterViewInit, ViewChild, Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletevalidacionComponent } from 'src/app/shared/deletevalidacion/deletevalidacion.component';
import { MatDialog } from '@angular/material/dialog';

import { CarteraService } from 'src/app/services/cartera.service';
import { cartera } from 'src/app/Models/cartera.model';

@Component({
  selector: 'app-list-cartera',
  templateUrl: './list-cartera.component.html',
  styleUrls: ['./list-cartera.component.css']
})
export class ListCarteraComponent implements OnInit, AfterViewInit {
  public TotalRecaudado:any;
  public TotalSaldo:any;
  public Total:any;
  dataSource = new MatTableDataSource<cartera>();
  public displayedColumns: string[] = [
    "cedula",
    "nombres",
    "apellidos",
    "estado",
    "recaudado",
    "saldo",
    "total",
    "Acciones",
  ];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,
    private CarteraS: CarteraService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.QueryCartera();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    var filteredData = this.dataSource.filteredData;
    this.Total=filteredData.reduce((summ, v) => summ += parseInt(v.total), 0);
    this.TotalSaldo=filteredData.reduce((summ, v) => summ += parseInt(v.saldo), 0);
    this.TotalRecaudado=filteredData.reduce((summ, v) => summ += parseInt(v.recaudado), 0);
  }
  QueryCartera() {
    try {
      this.CarteraS.getCartera().subscribe(
        (res: cartera[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            console.log('Datos res',res[0].TIPO,res[0].MENSAJE);
            this.dataSource.data = res;
            this.changeDetectorRefs.detectChanges();
            this.Total=res.reduce((summ, v) => summ += parseInt(v.total), 0);
            this.TotalSaldo=res.reduce((summ, v) => summ += parseInt(v.saldo), 0);
            this.TotalRecaudado=res.reduce((summ, v) => summ += parseInt(v.recaudado), 0);
          } else {
            this.notificacion(res[0].MENSAJE!);
            console.log('Datos res',res[0].TIPO,res[0].MENSAJE);
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
  notificacion(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }
}
