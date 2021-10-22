import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute ,Params } from "@angular/router";

import { InmuebleService } from 'src/app/services/inmueble.service';
import { inmueble } from 'src/app/Models/inmueble.model';

import { proyecto } from 'src/app/Models/proyecto.model';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { etapa} from 'src/app/Models/etapa.model';
import { EtapaService } from 'src/app/services/etapa.service';

@Component({
  selector: 'app-form-inmueble',
  templateUrl: './form-inmueble.component.html',
  styleUrls: ['./form-inmueble.component.css']
})
export class FormInmuebleComponent implements OnInit {
  /* myValue!: string; */
  CalValorFinal:any;
  CalValorInicial:any;
  ValorFinal:any;
  inmuebleid='';
  public DataProyectos!: any[];
  public DataEtapas!: any[];
  formInmueble: FormGroup;
// expacion
panelOpenState = false;
step = 0;
setStep(index: number) {
  this.step = index;
}
nextStep() {
  this.step++;
}
prevStep() {
  this.step--;
}
  constructor(private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private InmuebleS: InmuebleService,
    private ProyectoS: ProyectoService,
    private EtapaS: EtapaService) {
      this.formInmueble= this.fb.group({
        id: [""],
        manzana: ["", Validators.required],
        casa: ["", Validators.required],
        Valor_Inicial: ["", Validators.required],
        Valor_Final: [""],
        estado:["", Validators.required],
        idproyecto: ["", Validators.required],
        idetapa: ["", Validators.required],
        catastral: [""],
        escritura: [""],
        matricula: [""],

      })
    }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.inmuebleid = params.id;
    });
    if(this.inmuebleid != ""){
      this.QueryOneInmueble(this.inmuebleid);

    }
    this.listarProyecto();
  }
  onValueChange() {
    if(this.inmuebleid === undefined|| this.inmuebleid ==''){
      this.formInmueble.controls['Valor_Final'].setValue(this.formInmueble.controls['Valor_Inicial'].value);
    }else{
      this.CalValorFinal= (this.formInmueble.controls['Valor_Inicial'].value-this.CalValorInicial)+this.ValorFinal;
      this.formInmueble.controls['Valor_Final'].setValue(this.CalValorFinal);
    }
  }

  /*
  processMyValue(): void {
    let numberVal = parseInt(this.myValue).toLocaleString();
    this.formInmueble.value.Valor_Inicial = numberVal;
  } */
  listarProyecto(){
    try {
      this.ProyectoS.getProyectos().subscribe(
        (res:proyecto[])=> {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.DataProyectos=res;
          }else{
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }onSelect(seleccion:any){
    this.listarEtapa(seleccion.value);

  }
  listarEtapa(id: any){
    try {
      console.log('entro con el proyectoid', id);
      this.EtapaS.getEtapasProyecto(id).subscribe(
        (res:etapa[])=> {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.DataEtapas=res;
          }else{
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  QueryOneInmueble(inmuebleid:any) {
    try {
      this.InmuebleS.getInmueble(inmuebleid).subscribe(
        (res: inmueble[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.listarEtapa(res[0].idproyecto);
            this.CalValorInicial=res[0].Valor_Inicial;
            this.ValorFinal=res[0].Valor_Final;
            this.formInmueble.controls['idetapa'].setValue(res[0].idetapa);
            this.formInmueble.patchValue(res[0]);
          } else {
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  SaveInmueble() {
    try {
      if((this.formInmueble.value.id== null) ||(this.formInmueble.value.id=="")){
        this.InmuebleS.createInmueble(this.formInmueble.value).subscribe(
          (res: inmueble[]) => {
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.formInmueble.reset();
              this.router.navigate(['inmueble']);
            } else {
              this.notificacion(res[0].MENSAJE!);
            }
          },
          (err) => {
            this.notificacion(
              "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
            );
          }
        );
      }else{
        this.InmuebleS.updateInmueble(this.formInmueble.value).subscribe(
          (res: inmueble[]) => {
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.formInmueble.reset();
              this.router.navigate(['inmueble']);
            } else {
              this.notificacion(res[0].MENSAJE!);
            }
          },
          (err) => {
            this.notificacion(
              "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
            );
          }
        );
      }
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  notificacion(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }
}
