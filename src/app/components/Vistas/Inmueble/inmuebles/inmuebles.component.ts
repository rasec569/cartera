import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/* import {UserService, User } from 'src/app/services/user.service'; */
import { InmuebleService, Inmueble } from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {

  constructor(private inmuebleservice:InmuebleService,
    private router: Router) { }
    listaInmueble : Inmueble[]=[];

  ngOnInit(): void {
    this.listarInmuebles();
  }
  listarInmuebles(){
    this.inmuebleservice.getInmuebles().subscribe(
      res=>{
        this.listaInmueble=<any>res;
      },
      err=> console.log(err)
    );
  }
  eliminarInmueble(id:string){
  this.inmuebleservice.deleteInmueble(id).subscribe(
    res=>{
      console.log('Inmueble eliminado');
      this.listarInmuebles();
    }, err=> console.log(err)
  );
  }
  modificarInmueble(id:string){
    this.router.navigate(['/EditarInmueble/'+id]);
  }
  modificarUsuario(id:string){
    this.router.navigate(['/editarUsuario/'+id]);
  }
}
