import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(private UserService: UserService, private Router:Router){}

  ListarEquipo: User[]=[];

  ngOnInit(): void {
    this.listarUsuario();
  }



listarUsuario(){
  this.UserService.getUsuarios().subscribe(
    (res)=>{
      console.log('Res', res);
      this.ListarEquipo=<any>res;
    });
}

}