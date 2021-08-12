import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InmuebleService, Inmueble } from 'src/app/services/inmueble.service';
@Component({
  selector: 'app-registrar-inmueble',
  templateUrl: './registrar-inmueble.component.html',
  styleUrls: ['./registrar-inmueble.component.css']
})
export class RegistrarInmuebleComponent implements OnInit {

  constructor(private inmuebleservice:InmuebleService,
              private router: Router) { }

  inmueble:Inmueble={
    Id_Inmueble:"",
    Manzana:"",
    Num_Casa:"",
    Valor_Inicial:"",
    Ficha_Catastral:"",
    Escritura:"",
    Matricula_inmobiliaria:"",
    Estado:"",
    Fk_Id_Proyecto:""
  }

  ngOnInit(): void {
  }
  newinmueble(){
    delete this.inmueble.Id_Inmueble;

    this.inmuebleservice.newInmueble(this.inmueble).subscribe();
    this.router.navigate(['/Inmuebles'])
  }

}
