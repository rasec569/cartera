import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {
clienteid= "";
  constructor(public dialogoRef: MatDialogRef<DetalleClienteComponent>,
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
