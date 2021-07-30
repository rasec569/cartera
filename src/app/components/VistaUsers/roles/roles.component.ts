import { Component, OnInit } from '@angular/core';
import { RolService, Rol } from 'src/app/services/rol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers:[RolService]
})
export class RolesComponent implements OnInit {

  constructor(private rolservice:RolService,
    private router: Router) { }
    listaRol:Rol[]=[];

  ngOnInit(): void {
    this.listarRol();
  }
  listarRol(){
    this.rolservice.getRoles().subscribe(
      res=>{
        this.listaRol=<any>res;
      },
      err=> console.log(err)
    );
  }
  eliminarRol(id:string ){
    this.rolservice.deleteRol(id).subscribe(
      res=>{
        console.log('Usuario eliminado');
        this.listarRol();
      }, err=> console.log(err)
      );
    }
    modificarRol(id:string){
      this.router.navigate(['/editarUsuario/'+id]);
    }
}
