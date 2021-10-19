import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-detalle-inmueble',
  templateUrl: './detalle-inmueble.component.html',
  styleUrls: ['./detalle-inmueble.component.css']
})
export class DetalleInmuebleComponent implements OnInit {
  inmuebleid="";
  constructor(public dialogoRef: MatDialogRef<DetalleInmuebleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data != ""){
        this.inmuebleid=data;
      }
    }

  ngOnInit(): void {
  }
  close() {
    this.dialogoRef.close();
  }
}
