import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrar-user',
  templateUrl: './registrar-user.component.html',
  styleUrls: ['./registrar-user.component.css']
})
export class RegistrarUserComponent implements OnInit {

  //crear el arreglo donde se van a almacenar los datos del formulario
  Usuario={
    Nombres:"cesar",
    Apellidos:"valencia",
    Usuario:"rasec",
    password:"123",
    Celular:"34567",
    email:"456",
    Rol:"0",
    Area:"0"
  }
//invoca el servicio usuario
  constructor(private userservice:UserService,
    private router: Router) { }

  ngOnInit(): void {
  }
  //metodo Usuario Nuevo
  newuser(){
    //le paso al servicio el arreglo
    this.userservice.NewUser(this.Usuario).subscribe((res:any)=>{
      console.log('Los datos llegaron aqui',res);
    })
  }
}
