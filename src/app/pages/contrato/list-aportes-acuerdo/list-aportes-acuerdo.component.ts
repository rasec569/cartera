import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeletevalidacionComponent } from "src/app/shared/deletevalidacion/deletevalidacion.component";

import { AportesService } from 'src/app/services/aportes.service';
import { aporte } from 'src/app/Models/aporte.model';
import { FormAporteComponent } from '../form-aporte/form-aporte.component';

@Component({
  selector: 'app-list-aportes-acuerdo',
  templateUrl: './list-aportes-acuerdo.component.html',
  styleUrls: ['./list-aportes-acuerdo.component.css']
})
export class ListAportesAcuerdoComponent implements OnInit {
  @Input() contratoid!:string;
  public total:any;
  dataSource = new MatTableDataSource<aporte>();
  numaporte=0;
  public displayedColumns: string[] = [
    "numero",
    "concepto",
    "cuota",
    "referencia",
    "fecha",
    "valor",
    "Acciones",
  ];
  readonly width:string='300px';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef,
    private AportesS: AportesService,
    public dialog: MatDialog) { }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      var filteredData = this.dataSource.filteredData;
      this.total=filteredData.reduce((summ, v) => summ += parseInt(v.valor), 0);
    }
  ngOnInit(): void {
    this.QueryAportes(this.contratoid)
  }
  QueryAportes(contratoid:any){
    try{
      this.AportesS.getAportesAcuerdo(contratoid).subscribe((res:aporte[])=>{
        if (res[0].TIPO ==undefined && res[0].MENSAJE == undefined){
          this.dataSource.data = res;
          this.changeDetectorRefs.detectChanges();
          this.total=res.reduce((summ, v) => summ += parseInt(v.valor), 0);
          this.dataSource.sort = this.sort;
          this.numaporte=this.dataSource.data.length;
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
  OpenAdd(){
    const dialogoRef = this.dialog.open(FormAporteComponent, {
      width: this.width,
      data: {aporteid:"",numaporte:this.numaporte , acuerdo:this.contratoid}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryAportes(this.contratoid);
    });
  }
  OpenEdit(id: any){
    const dialogoRef = this.dialog.open(FormAporteComponent, {
      width: this.width,
      data: {aporteid:id,numaporte:this.numaporte , acuerdo:this.contratoid}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryAportes(this.contratoid);
    });
  }
  RemoveAporte(Aporte: aporte) {
    const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
      width: "300px",
    });
    dialogoRef.afterClosed().subscribe((res) => {
      if (res) {
        try {
          this.AportesS.deleteAporte(Aporte).subscribe(
            (res: aporte[]) => {
              if (res[0].TIPO == "3") {
                this.notificacion(res[0].MENSAJE!);
                this.QueryAportes(this.contratoid);
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
