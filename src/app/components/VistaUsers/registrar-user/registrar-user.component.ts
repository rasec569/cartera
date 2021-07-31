import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-registrar-user',
  templateUrl: './registrar-user.component.html',
  styleUrls: ['./registrar-user.component.css']
})
export class RegistrarUserComponent implements OnInit {

  //crear el arreglo donde se van a almacenar los datos del formulario
  usuario: User = {
    Id_Usuario:"",
    Nombre_Usuario:"",
    Apellido_Usuario:"",
    Usuario:"",
    password:"",
    Celular:"",
    email:"",
    Rol:"",
    Area:""
  };
//invoca el servicio usuario
  constructor(private userservice:UserService,
    private router: Router) { }

  ngOnInit(): void {
  }
  //metodo Usuario Nuevo
  newuser(){
    delete this.usuario.Id_Usuario;
    //le paso al servicio el arreglo
    this.userservice.NewUser(this.usuario).subscribe();
    this.router.navigate(['/Usuario']);
  }
}
