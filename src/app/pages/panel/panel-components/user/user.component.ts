import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { usuario } from 'src/app/Models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {rol} from 'src/app/Models/rol.model';
import { RolService } from 'src/app/services/rol.service';
import {area} from 'src/app/Models/area.model';
import { AreasService } from 'src/app/services/areas.service';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit , AfterViewInit{
  dataSource = new MatTableDataSource();
  public displayedColumns: string[] = [
    "nombres",
    "apellidos",
    "usuario",
    "Area",
    "Rol",
    "Acciones",
  ];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private UserS: UserService,
  ) {  }

  ngOnInit(): void {
    this.QueryUser();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  QueryUser() {
    try {
      this.UserS.getUsuarios().subscribe(
        (res: usuario[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.dataSource.data = res;
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
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  RemoveUsuario(Usuario: usuario) {
    try {
      console.log(Usuario)
      this.UserS.deleteUsuario(Usuario).subscribe(
        (res: usuario[]) => {
          if (res[0].TIPO == "3") {
            this.notificacion(res[0].MENSAJE!);
          } else {
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
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
