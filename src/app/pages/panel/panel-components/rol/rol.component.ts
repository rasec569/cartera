import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolService } from 'src/app/services/rol.service';
import { rol } from 'src/app/Models/rol.model';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit , AfterViewInit{
  idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  public displayedColumns: string[] = ['nombre', 'descripcion','Acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort,{ static: true})
  sort!:MatSort
  constructor(private RolS:RolService, private _snackBar: MatSnackBar) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.QueryRoles();
    }
  }
  ngOnInit(): void {
    this.QueryRoles();
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  QueryRoles(){
    try{
      this.RolS.getRoles().subscribe(
        (res:rol[])=>{
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            console.log(res);
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
