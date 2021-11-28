import { AfterViewInit, ViewChild, Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from "src/environments/environment";
import { DeletevalidacionComponent } from 'src/app/shared/deletevalidacion/deletevalidacion.component';
import { MatDialog } from '@angular/material/dialog';

import { file } from 'src/app/Models/file.model';
import { FilesService } from "src/app/services/files.service";

import {area} from 'src/app/Models/area.model';
import { AreasService } from 'src/app/services/areas.service';
import { categoriaService } from "src/app/services/categoria.service";
import { categoria } from "src/app/Models/categoria.model";

@Component({
  selector: 'app-list-all-file',
  templateUrl: './list-all-file.component.html',
  styleUrls: ['./list-all-file.component.css']
})
export class ListAllFileComponent implements OnInit,AfterViewInit {
  dataSource = new MatTableDataSource<file>();
  serverPath = "";
  listArea:area[]=[];
  listCategoria:categoria[]=[];
  public displayedColumns: string[] = [
    "nombre",
    "nombreCategoria",
    "nombreArea",
    "fechaCreacion",
    "fechaModificacion",
    "Acciones"
  ];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef,
    private FilesS:FilesService,
    public dialog: MatDialog,
    private AreaS:AreasService,
    private CategoriaS: categoriaService) { }

  ngOnInit(): void {
    this.QueryFiles();
    this.serverPath = environment.url + "/";
    this.listarArea();
    this.listarCategoria();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  QueryFiles() {
    try {
      this.FilesS.getfiles().subscribe(
        (res: file[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.dataSource.data = res;
            this.changeDetectorRefs.detectChanges();
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
  RemoveFiles(Files: file) {
    const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
      width: "300px",
    });
    dialogoRef.afterClosed().subscribe((res) => {
      if (res) {
        try {
          this.FilesS.deletefiles(Files).subscribe(
            (res: file[]) => {
              if (res[0].TIPO == "3") {
                this.notificacion(res[0].MENSAJE!);
                this.QueryFiles();
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
  listarArea() {
    try {
      this.AreaS.getAreas().subscribe(
        (res: area[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.listArea = res;
            this.changeDetectorRefs.detectChanges();
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
  listarCategoria() {
    try {
      this.CategoriaS.getCategorias().subscribe(
        (res: categoria[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.listCategoria = res;
            this.changeDetectorRefs.detectChanges();
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
  notificacion(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }
}
