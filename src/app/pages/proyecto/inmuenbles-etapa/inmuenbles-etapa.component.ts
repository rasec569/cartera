import { AfterViewInit, ViewChild, Component, Inject, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { InmuebleService } from 'src/app/services/inmueble.service';
import { inmueble } from 'src/app/Models/inmueble.model';
import { DetalleInmuebleComponent } from '../../inmueble/detalle-inmueble/detalle-inmueble.component';

@Component({
  selector: 'app-inmuenbles-etapa',
  templateUrl: './inmuenbles-etapa.component.html',
  styleUrls: ['./inmuenbles-etapa.component.css']
})
export class InmuenblesEtapaComponent implements OnInit {
  etapaid="";
  dataSource = new MatTableDataSource<inmueble>();
  public displayedColumns: string[] = [
    "Manzana",
    "Casa",
    "Valor_Final",
    "estado",
    "Acciones",
  ];
  readonly width:string='900px';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor( private _snackBar: MatSnackBar,
    private InmuebleS: InmuebleService,
    public dialog: MatDialog,
    public dialogoRef: MatDialogRef<InmuenblesEtapaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data != ""){
        this.etapaid=data;
        this.QueryInmuebles(data);
      }
     }

  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  close() {
    this.dialogoRef.close();
  }
  OpenDetalle(id: any){
    const dialogoRef = this.dialog.open(DetalleInmuebleComponent , { width: this.width,
      data: id, panelClass: 'my-dialog',});
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryInmuebles(this.data);
      });
  }
  QueryInmuebles(proyectoid:any) {
    try {
      this.InmuebleS.getInmuebleEtapa(proyectoid).subscribe(
        (res: inmueble[]) => {
          if (res[0] != undefined){
            if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
              this.dataSource.data = res;
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
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
  notificacion(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }
}
