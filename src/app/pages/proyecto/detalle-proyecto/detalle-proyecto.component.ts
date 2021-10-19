import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {
  proyectoid = "";

  constructor(public dialogoRef: MatDialogRef<DetalleProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('esto trae al dialog', data);
      if (data != ""){
        this.proyectoid=data;
      }
    }

  ngOnInit(): void {
  }
  close() {
    this.dialogoRef.close();
  }

}
