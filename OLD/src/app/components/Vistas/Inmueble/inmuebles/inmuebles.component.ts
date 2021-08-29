import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/* import {UserService, User } from 'src/app/services/user.service'; */
import { InmuebleService, Inmueble } from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {


  constructor(private inmuebleservice:InmuebleService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
    listaInmueble : Inmueble[]=[];

  ngOnInit(): void {
    const id_entrada = this.activatedRoute.snapshot.paramMap.get('id');
    if(id_entrada){
      this.listarInmueblesProyecto(id_entrada);
    }else{
      this.listarInmuebles();
    }

  }
  listarInmuebles(){
    this.inmuebleservice.getInmuebles().subscribe(
      res=>{
        this.listaInmueble=<any>res;
      },
      err=> console.log(err)
    );
  }
  listarInmueblesProyecto(id:string){
    this.inmuebleservice.getInmuebleProyecto(id).subscribe(
      res=>{
        console.log("entro al metodo", res);
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
}
