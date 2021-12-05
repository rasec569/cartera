import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-cartera',
  templateUrl: './detalle-cartera.component.html',
  styleUrls: ['./detalle-cartera.component.css']
})
export class DetalleCarteraComponent implements OnInit {
  clienteid= "";
  constructor(public dialogoRef: MatDialogRef<DetalleCarteraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('esto trae al dialog', data);
      if (data != ""){
        this.clienteid=data;
      }
    }

  ngOnInit(): void {
  }
  close() {
    this.dialogoRef.close();
  }

}
