import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolService, Rol} from 'src/app/services/rol.service';
@Component({
  selector: 'app-registrar-rol',
  templateUrl: './registrar-rol.component.html',
  styleUrls: ['./registrar-rol.component.css']
})
export class RegistrarRolComponent implements OnInit {

  rol:Rol={
    Id_Rol:"",
    Nombre_Rol:"",
    Descripcion:""
  }
  constructor(private rolservice:RolService,
    private router: Router) { }

  ngOnInit(): void {
  }
  newrol(){
    delete this.rol.Id_Rol;
    //le paso al servicio el arreglo
    this.rolservice.newRol(this.rol).subscribe();
    this.router.navigate(['/Usuario']);
  }

}
