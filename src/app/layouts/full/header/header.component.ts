import { Component } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(private AutenticacionS:AutenticacionService){  }
  Salir(){
    this.AutenticacionS.logut();
  }
}
