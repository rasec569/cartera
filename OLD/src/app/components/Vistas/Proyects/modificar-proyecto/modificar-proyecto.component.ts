import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectoService, Proyecto} from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-modificar-proyecto',
  templateUrl: './modificar-proyecto.component.html',
  styleUrls: ['./modificar-proyecto.component.css']
})
export class ModificarProyectoComponent implements OnInit {

  constructor(
    private proyectoservice:ProyectoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
    proyecto!:Proyecto;
    editarproyecto=new FormGroup ({
      Nombre_Proyecto: new FormControl(''),
      Ubicacion_Proyecto: new FormControl('')
    });

  ngOnInit(): void {
    const id_entrada = this.activatedRoute.snapshot.paramMap.get('id');
    if(id_entrada){
      this.proyectoservice.getProyecto(id_entrada).subscribe(
        (res:any)=>{
          this.proyecto=res[0];
          this.editarproyecto.setValue({
            'Nombre_Proyecto':this.proyecto.Nombre_Proyecto,
            'Ubicacion_Proyecto':this.proyecto.Ubicacion_Proyecto
          });
          console.log(this.editarproyecto.value);
        }, err=> console.log(err)
      );
    }
  }
  editProyecto(){

  }
}
