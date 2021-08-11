import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InmuebleService, Inmueble} from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-modificar-inmuebles',
  templateUrl: './modificar-inmuebles.component.html',
  styleUrls: ['./modificar-inmuebles.component.css']
})
export class ModificarInmueblesComponent implements OnInit {

  constructor(private inmuebleservice:InmuebleService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

inmueble!:Inmueble;
editarinmueble=new FormGroup ({
Manzana: new FormControl(''),
Num_Casa: new FormControl(''),
Valor_Inicial: new FormControl(''),
Ficha_Catastral: new FormControl(''),
Escritura: new FormControl(''),
Matricula_inmobiliaria: new FormControl(''),
Estado: new FormControl(''),
Fk_Id_Proyecto: new FormControl(''),
});

  ngOnInit(): void {
    const id_entrada = this.activatedRoute.snapshot.paramMap.get('id');
    if (id_entrada){
      this.inmuebleservice.getInmueble(id_entrada).subscribe(
      (res:any)=>{
        this.inmueble=res[0];
        this.editarinmueble.setValue({
        'Manzana':this.inmueble.Manzana,
        'Num_Casa':this.inmueble.Num_Casa,
        'Valor_Inicial':this.inmueble.Valor_Inicial,
        'Ficha_Catastral':this.inmueble.Ficha_Catastral,
        'Escritura':this.inmueble.Escritura,
        'Matricula_inmobiliaria':this.inmueble.Matricula_inmobiliaria,
        'Estado':this.inmueble.Estado,
        'Fk_Id_Proyecto':this.inmueble.Fk_Id_Proyecto
        });
      }, (err)=> console.log(err)
      );
    }
  }

}
