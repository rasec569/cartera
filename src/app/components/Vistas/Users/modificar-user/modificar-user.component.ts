import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modificar-user',
  templateUrl: './modificar-user.component.html',
  styleUrls: ['./modificar-user.component.css']
})
export class ModificarUserComponent implements OnInit {

  constructor(
    private userservice:UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    usuario!: User;
    editaruser = new FormGroup ({
    Nombre_Usuario: new FormControl(''),
    Apellido_Usuario: new FormControl(''),
    Usuario: new FormControl(''),
    Celular: new FormControl(''),
    email: new FormControl(''),
    Rol: new FormControl(''),
    Area: new FormControl('')
  });

  ngOnInit(): void {
    const id_entrada = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id de entrada' + id_entrada);
    if (id_entrada) {
      this.userservice.getusuario(id_entrada).subscribe(
      (res:any)=>{
        this.usuario=res[0];
        this.editaruser.setValue({
          // Manejar Nombres atributos Foreankey diferentes por seguridad en la consulta se formatea
          'Nombre_Usuario':this.usuario.Nombre_Usuario,
          'Apellido_Usuario':this.usuario.Apellido_Usuario,
          'Usuario':this.usuario.Usuario,
          'Celular':this.usuario.Celular,
          'email':this.usuario.email,
          'Rol':this.usuario.Rol,
          'Area':this.usuario.Area
        });
      }, (err)=> console.log(err)
      );
    }
  }
  edituser(){
    this.userservice.editUsuario(this.usuario.Id_Usuario!, this.usuario).subscribe(
      res=>{
        console.log(res);
      }, err=> console.log(err)
    );
  this.router.navigate(['/Usuario']);
  }

}
