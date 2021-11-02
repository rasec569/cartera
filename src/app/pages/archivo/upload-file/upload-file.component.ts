import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { file } from 'src/app/Models/file.model';
import { FilesService } from "src/app/services/files.service";

import {area} from 'src/app/Models/area.model';
import { AreasService } from 'src/app/services/areas.service';
import { categoria } from 'src/app/Models/categoria.model';
import { categoriaService } from 'src/app/services/categoria.service';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  requiredFileType!:string;
  uploadProgress!:number;
  uploadSub!: Subscription;

  public DataAreas!: any[];
  public DataCategoria!: any[];
  fileName = '';
  uploadedFiles!: Array<File>;
  Files: file = {
    nombreReal: "",
    estadoArchivo: "",
    rutaRelativa: "",
    MENSAJE: "",
    TIPO: "",
    fechaCreacion: "",
    fechaModificacion: "",
    idArchivo: "",
    nombreArea: "",
    idCategoria: "",
    idarea: "",
    nombreCategoria: "",
    nombreDerivado: "",
  };
  constructor(private _snackBar: MatSnackBar,
    private FilesS:FilesService,
    private AreaS:AreasService,
    private CategoriaS: categoriaService,
    private router: Router) { }

  ngOnInit(): void {
    this.listarCategoria();
    this.listarArea();
  }
  onFileSelected(event:any) {
    this.uploadedFiles = event.target.files;
    console.log('cargar', event.target.files);

      this.fileName = "Oprima el boton guardar para subir los archivos";
}
SaveFile() {
  try {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append(
        "uploads",
        this.uploadedFiles[i],
        this.uploadedFiles[i].name
      );
      formData.append('file',JSON.stringify(this.Files))
      this.fileName = this.uploadedFiles[i].name;
    }
    /* utf8' is currently an alias for the character set UTF8MB3, but will be an alias for UTF8MB4 in a future release. Please consider using UTF8MB4 in order to be unambiguous. */
    console.log(formData);
    this.FilesS.createfiles(formData).subscribe(
      (res: file) => {
        console.log("-----------------------------")
        console.log(res);
        if (res.TIPO == "3") {
          this.notificacion(res.MENSAJE!);
          this.router.navigate(['Archivos']);

        } else {
          this.notificacion(res.MENSAJE!);
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



cancelUpload() {
  this.uploadSub.unsubscribe();
  this.reset();
}

reset() {
  this.uploadProgress = 0;
  this.uploadSub.unsubscribe();
}
listarArea(){
  try {
    this.AreaS.getAreas().subscribe(
      (res:area[])=> {
        if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
          console.log('Lista para select 2',res)
          this.DataAreas=res;
        }else{
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
listarCategoria(){
  try {
    this.CategoriaS.getcategorias().subscribe(
      (res:categoria[])=> {
        if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
          console.log('Lista para select cat',res)
          this.DataCategoria=res;
        }else{
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
