import { AfterViewInit, ViewChild, Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { usuario } from 'src/app/Models/usuario.model';
import { DeletevalidacionComponent } from 'src/app/shared/deletevalidacion/deletevalidacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements  OnInit, AfterViewInit  {
  public listUser!: any[];
  dataSource = new MatTableDataSource<usuario>();
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
  constructor(private _snackBar: MatSnackBar,
              private UserS: UserService,
              private changeDetectorRefs: ChangeDetectorRef,
              public dialog: MatDialog) { }

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
            this.listUser=res;
            this.changeDetectorRefs.detectChanges();
            this.dataSource.data = res;
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
  RemoveUsuario(Usuario: usuario) {
    const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
      width: "300px",
    });
    dialogoRef.afterClosed().subscribe((res) => {
      if (res) {
        try {
          this.UserS.deleteUsuario(Usuario).subscribe(
            (res: usuario[]) => {
              if (res[0].TIPO == "3") {
                this.notificacion(res[0].MENSAJE!);
                this.QueryUser();
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
  /* RemoveUsuario(Usuario: usuario) {
    try {
      console.log(Usuario)
      this.UserS.deleteUsuario(Usuario).subscribe(
        (res: usuario[]) => {
          if (res[0].TIPO == "3") {
            this.notificacion(res[0].MENSAJE!);
            this.QueryUser();
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
  } */
  notificacion(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }
}
