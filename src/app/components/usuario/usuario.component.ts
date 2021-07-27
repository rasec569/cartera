import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
 //varibale
 //varibale
  ListarUsuario: Usuario[] = [];

 constructor(private UsuarioService:UsuarioService, private router:Router) { }

 
 ngOnInit(): void {
  this.listarEquipo();
}


listarEquipo()
{
  this.UsuarioService.getUsuarios().subscribe(
    res=>{
      console.log(res);
      this.ListarUsuario=<any>res;
    },
    err => console.log(err)
  );
}


eliminar(id:string)
{
  this.UsuarioService.deleteUsuario(id).subscribe(
    res=>{
      console.log('equipo eliminado');
      this.listarEquipo();
    },
    err=> console.log(err)
    );
}

modificar(id:string){
  this.router.navigate(['/edit/'+id]);
}



}
