import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService, Proyecto } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  constructor(private proyectoservice:ProyectoService,
    private router: Router) { }
    listaProyecto:Proyecto[]=[];

  ngOnInit(): void {
    this.listarProyecto();
  }
  listarProyecto(){
    this.proyectoservice.getProyectos().subscribe(
      res=>{
        this.listaProyecto=<any>res;
      }, err=> console.log(err)
    )
  }
  eliminarProyecto(id:string){
    this.proyectoservice.delete(id).subscribe(
      res=>{
        console.log('proyecto eliminado');
        this.listarProyecto();
      }, err=> console.log(err)
    );
  }
  modificarProyecto(id:string){
    this.router.navigate(['EditarProyecto/'+id]);
  }
  detalleProyecto(){
    this.router.navigate(['Inmuebles/']);
  }
}
