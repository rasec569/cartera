import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService, Proyecto} from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-registrar-proyecto',
  templateUrl: './registrar-proyecto.component.html',
  styleUrls: ['./registrar-proyecto.component.css']
})
export class RegistrarProyectoComponent implements OnInit {

  proyecto:Proyecto={
    Id_Proyecto:"",
    Nombre_Proyecto:"",
    Ubicacion_Proyecto:""
  }
  constructor(private proyectoservice:ProyectoService,
    private router: Router) { }

  ngOnInit(): void {
  }
  newProyecto(){
    delete this.proyecto.Id_Proyecto;
    this.proyectoservice.newProyecto(this.proyecto).subscribe();
    this.router.navigate(['Proyectos']);
  }

}
