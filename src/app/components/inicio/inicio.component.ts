import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers:[UserService],


})
export class InicioComponent implements OnInit {
  constructor(private userservice:UserService,
    private router: Router) { }
    listaUsuario : User[]=[];

  ngOnInit(): void {
    this.listarUsuario();
  }
  listarUsuario(){
    this.userservice.getUsuarios().subscribe(
      res=>{
        console.log('Res', res);
        this.listaUsuario=<any>res;
        /* this.usuario=<any>res; */
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
  /* buscarUsuario(){
    return.userservice.
  } */

}
