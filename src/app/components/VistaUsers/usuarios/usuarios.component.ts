import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService, User } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers:[UserService]
})
export class UsuariosComponent implements OnInit {

  constructor(private userservice:UserService,
    private router: Router) { }
    listaUsuario : User[]=[];
  ngOnInit(): void {
    this.listarUsuario();
  }
  listarUsuario(){
    this.userservice.getUsuarios().subscribe(
      res=>{
        this.listaUsuario=<any>res;
      },
      err=> console.log(err)
    );
  }
  eliminarUsuario(id:string ){
  this.userservice.deleteUsuario(id).subscribe(
    res=>{
      console.log('Usuario eliminado');
      this.listarUsuario();
    }, err=> console.log(err)
    );
  }
  modificarUsuario(id:string){
    this.router.navigate(['/editarUsuario/'+id]);
  }

}
