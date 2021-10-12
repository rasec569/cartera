import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './deletevalidacion.component.html'
})
export class DeletevalidacionComponent {

  constructor(public dialogoRef:MatDialogRef<DeletevalidacionComponent>) { }
}
