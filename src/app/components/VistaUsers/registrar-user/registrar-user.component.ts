import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/services/user.service';
//para llenar combobox del rol
import { RolService , Rol} from 'src/app/services/rol.service';


@Component({
  selector: 'app-registrar-user',
  templateUrl: './registrar-user.component.html',
  styleUrls: ['./registrar-user.component.css'],
  providers:[RolService]
})
export class RegistrarUserComponent implements OnInit {

  //invoca el servicio usuario
  constructor(private userservice:UserService, private rolservice:RolService,
    private router: Router) { }
    listaRol:Array <Rol>=[]
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
  ngOnInit(): void {
    this.rolservice.getRoles().subscribe(
      res=>{
        this.listaRol=<any>res;
      },
      err=> console.log(err)
    );
  }
  //metodo Usuario Nuevo
  newuser(){
    delete this.usuario.Id_Usuario;
    //le paso al servicio el arreglo
    this.userservice.NewUser(this.usuario).subscribe();
    this.router.navigate(['/Usuario']);
  }
}
