import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-contrato',
  templateUrl: './detalle-contrato.component.html',
  styleUrls: ['./detalle-contrato.component.css']
})
export class DetalleContratoComponent implements OnInit {
contratoid= "";
  constructor(public dialogoRef: MatDialogRef<DetalleContratoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != ""){
      this.contratoid=data.Contratoid;
    } }

  ngOnInit(): void {
  }
  close() {
    this.dialogoRef.close();
  }

}
