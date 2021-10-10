import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { usuario } from 'src/app/Models/usuario.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  public Data!: any[];
  public displayedColumns: string[] = ['nombres', 'apellidos','usuario','Area','Rol','Acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort,{ static: true})
  sort!:MatSort
  constructor(private _snackBar: MatSnackBar, private UserS:UserService) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.QueryUser();
    }
  }
  ngOnInit(): void {
    this.QueryUser();
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  QueryUser(){
    try{
      this.UserS.getUsuarios().subscribe(
        (res: usuario[]) => {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.Data=res;
            this.dataSource.data=res;
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
    }catch (error) {
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
