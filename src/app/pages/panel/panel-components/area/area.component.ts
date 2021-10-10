import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AreasService } from 'src/app/services/areas.service';
import { area } from 'src/app/Models/area.model';


@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})


export class AreaComponent implements OnInit , AfterViewInit{
  idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  public displayedColumns: string[] = ['Area', 'Descripcion','Acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort,{ static: true})
  sort!:MatSort

  constructor(private AreaS:AreasService,private _snackBar: MatSnackBar) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.QueryAreas();
    }
  }
  ngOnInit(): void {
    this.QueryAreas();
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  QueryAreas(){
    try{
      this.AreaS.getAreas().subscribe(
        (res:area[])=>{
          console.log(res);
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.dataSource.data=res;
            ;
          }else{
            this.error(
              res[0].MENSAJE!
            );
          }
        },
        (err) => {
          this.error(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.error(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }

  error(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }
}
