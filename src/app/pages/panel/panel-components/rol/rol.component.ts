import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolService } from 'src/app/services/rol.service';
import { rol } from 'src/app/Models/rol.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeletevalidacionComponent } from 'src/app/shared/deletevalidacion/deletevalidacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit , AfterViewInit{
  listRoles:rol[]=[];
  formRol:FormGroup;
  idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  public displayedColumns: string[] = ['nombre', 'descripcion','Acciones'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private RolS:RolService,  private fb:FormBuilder,
              private _snackBar: MatSnackBar, public dialog:MatDialog) {
    this.formRol=this.fb.group({
      id:['', Validators.required],
      nombre!:['', Validators.required],
      descripcion:['', Validators.required],
      dataSource:new MatTableDataSource()
    })
  }
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
          console.log(res);
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            /* console.log(res); */
            /* this.listRoles=res; */
            this.dataSource=new MatTableDataSource(res);
          }else{
            this.notificacion(
              res[0].MENSAJE!
            );
          }
        },
        (err) => {
          this.notificacion(
            "notificacion de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (notificacion) {
      this.notificacion(
        "notificacion de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  SaveRol() {
    try {
        this.RolS.createRol(this.formRol.value).subscribe(
          (res: rol[]) => {
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.changeMode(1);
              this.QueryRoles();
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
      } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  QueryOneRol(Rol: rol) {
    try {
      this.RolS.getRol(Rol).subscribe(
        (res: rol[]) => {
          console.log(res[0]);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formRol.setValue(res[0]);
            console.log(res[0]);
              this.changeMode(3);
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
  UpdateRol() {
    try {
        this.RolS.updateRol(this.formRol.value).subscribe(
          (res: rol[]) => {
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.changeMode(1);
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
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }

  RemoveRol(Rol: rol) {
    try {
      this.RolS.deleteRol(Rol).subscribe(
        (res: rol[]) => {
          if (res[0].TIPO == "3") {
            this.notificacion(res[0].MENSAJE!);
            this.QueryRoles();
          } else {
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.QueryRoles();
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
  confirmaciondelete(Rol: rol){ console.log(Rol)
    const dialogoRef=this.dialog.open(DeletevalidacionComponent, {
      width:'300px'
    });
    dialogoRef.afterClosed().subscribe(res=>{
      console.log(res)
      if(res.exito===1){
        this.RemoveRol(Rol);
      }
      this.QueryRoles();
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
