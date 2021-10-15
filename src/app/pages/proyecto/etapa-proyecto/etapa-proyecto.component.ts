import { AfterViewInit, ViewChild, Component, OnInit,ChangeDetectorRef, Input  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletevalidacionComponent } from 'src/app/shared/deletevalidacion/deletevalidacion.component';
import { MatDialog } from '@angular/material/dialog';

import { EtapaService } from 'src/app/services/etapa.service';
import { etapa } from 'src/app/Models/etapa.model';
import { FormEtapaComponent } from '../form-etapa/form-etapa.component';
import { InmuenblesEtapaComponent } from '../inmuenbles-etapa/inmuenbles-etapa.component';

@Component({
  selector: 'app-etapa-proyecto',
  templateUrl: './etapa-proyecto.component.html',
  styleUrls: ['./etapa-proyecto.component.css']
})

export class EtapaProyectoComponent implements OnInit, AfterViewInit {
  @Input() proyectoid!:string;
  dataSourceEtapa = new MatTableDataSource<etapa>();
  public displayedColumns: string[] = [
    "numero",
    "inmuebles",
    "manzanas",
    "valor",
    "estado",
    "Acciones",
  ];
  readonly width:string='300px';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,
    private EtapaS: EtapaService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.QueryEtapas(this.proyectoid);
  }
  ngAfterViewInit() {
    this.dataSourceEtapa.paginator = this.paginator;

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEtapa.filter = filterValue.trim().toLowerCase();
  }
  QueryEtapas(proyectoid:any) {
    try {
      this.EtapaS.getEtapasProyecto(proyectoid).subscribe(
        (res: etapa[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.dataSourceEtapa.data = res;
            this.changeDetectorRefs.detectChanges();
            this.dataSourceEtapa.sort = this.sort;
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
    const dialogoRef = this.dialog.open(FormEtapaComponent, {
      width: this.width,
      data: {etapaid:"",proyectoid:this.proyectoid }
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryEtapas(this.proyectoid);
    });
  }
  OpenDetalle(id: any){
    const dialogoRef = this.dialog.open(InmuenblesEtapaComponent, {
      width: '900px',
      data: id
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryEtapas(this.proyectoid);
    });
  }
  OpenEdit(id: any){
    const dialogoRef = this.dialog.open(FormEtapaComponent, {
      width: this.width,
      data: {etapaid:id,proyectoid:this.proyectoid }
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryEtapas(this.proyectoid);
    });
  }
  OpenDelete(Etapa:etapa){
    const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
      width: "300px",
    });
    dialogoRef.afterClosed().subscribe((res) => {
      if (res) {
        try {
          this.EtapaS.deleteEtapa(Etapa).subscribe(
            (res: etapa[]) => {
              if (res[0].TIPO == "3") {
                this.notificacion(res[0].MENSAJE!);
                this.QueryEtapas(this.proyectoid);
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
