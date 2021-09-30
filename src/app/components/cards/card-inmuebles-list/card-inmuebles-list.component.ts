import { Component, Input, OnInit } from '@angular/core';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { inmueble } from 'src/app/Models/inmueble.model';
import { GlobalService } from 'src/app/providers/GlobalService';
import { AlertService } from "../../_alert";

import {proyecto} from 'src/app/Models/proyecto.model';
import{ProyectoService} from 'src/app/services/proyecto.service';

import { EtapaService } from 'src/app/services/etapa.service';
import { etapa } from 'src/app/Models/etapa.model'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-inmuebles-list',
  templateUrl: './card-inmuebles-list.component.html',
  /* styleUrls: ['./card-inmuebles-list.component.css'] */
})
export class CardInmueblesListComponent implements OnInit {
  total:number;
  indice:number;
  Inmueble: inmueble={
    id:"",
    casa: "",
    manzana:"",
    Valor_Inicial: "",
    Valor_Final:"",
    catastral:"",
    escritura: "",
    matricula:"",
    estado: "",
    idproyecto:"",
    idetapa: "",
    TIPO:"",
    MENSAJE:""
  }
  Etapa:etapa={
    id:"",
    numero:"",
    valor:"",
    estado:"",
    manzanas:"",
    idproyecto:"",
    TIPO:"",
    MENSAJE:""
  }
  @Input()
  proyectoid:number=0;
  etapaid:string="";

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  inmuebles=[];
  inmueblesetapa=[];
  CloneInmuebles=[];
  listProyectos=[];

  listEtapa:Observable<etapa[]>;

  idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
    constructor(private InmuebleS:InmuebleService,
      private ProyectoS:ProyectoService,
      private EtapaS:EtapaService,
      protected alertService: AlertService,
      private globalEvents: GlobalService) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      if(this.proyectoid==0){
        this.QueryInmuebles();
      }
      else{

        this.QueryInmueblesProyecto(this.proyectoid);
        this.changeMode(4);
      }
    }
  }
  ngOnInit(): void {
    if(this.proyectoid==0){
      this.QueryInmuebles();
    }else if(this.etapaid!=""){
      this.QueryInmueblesEtapa(this.etapaid);
    }
    else{
      this.QueryInmueblesProyecto(this.proyectoid);
    }
    this.listarProyecto();
  }
  clearDataInmueble() {
    this.Inmueble = {
      id:"",
      manzana:"",
      casa: "",
      Valor_Inicial: "",
      Valor_Final:"",
      catastral:"",
      escritura: "",
      matricula:"",
      estado: "",
      idproyecto:"",
      idetapa: "",
      TIPO:"",
      MENSAJE:""
    };
  }
  validadorInmueble() {
    if (
      this.Inmueble.manzana == "" ||
      this.Inmueble.casa == ""  ||
      this.Inmueble.Valor_Inicial == ""  ||
      this.Inmueble.estado == ""  ||
      this.Inmueble.idproyecto == ""
    ) {
      this.alertService.warn("Todos los campos deben estar diligenciados!", this.options);
      console.log("no")
      return false;
    }else{
      return true;
    }
  }
  listarProyecto(){
    try {
      this.ProyectoS.getProyectos().subscribe(
        (res:proyecto[])=> {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.listProyectos=res;
          }else{
            this.alertService.error(
              res[0].MENSAJE,
              this.options
            );
          }
        },
        (err) => {
          this.alertService.error(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
            this.options
          );
        }
      );
    } catch (error) {
      console.log("entro"+error)
      this.alertService.error(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
        this.options
      );
    }
  }
  ListarEtapas(idProyecto:any):void{
    this.Etapa.idproyecto=idProyecto;
    try {
      this.listEtapa=this.EtapaS.getEtapasProyecto(this.Etapa);




      /* this.EtapaS.getEtapasProyecto(this.Etapa).subscribe(
        (res: etapa[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.listEtapa=res;
            console.log(res)
          } else {
            this.alertService.error(res[0].MENSAJE, this.options);
          }
        },
        (err) => {
          this.alertService.error(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
            this.options
          );
        }
      ); */
    } catch (error) {
      this.alertService.error(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
        this.options
      );
    }
  }
  QueryInmuebles(){
    try{
      this.InmuebleS.getInmuebles().subscribe(
        (res:inmueble[])=>{
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.inmuebles=res;
            this.CloneInmuebles=res;
            this.Total();
          }else{
            this.alertService.error(
              res[0].MENSAJE,
              this.options
            );
          }
        },
        (err) => {
          this.alertService.error(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
            this.options
          );
        }
      );
    } catch (error) {
      this.alertService.error(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
        this.options
      );
    }
  }
  QueryInmueblesProyecto(idProyecto:any):void{
    this.Inmueble.idproyecto=idProyecto;
    try{
      this.InmuebleS.getInmuebleProyecto(this.Inmueble).subscribe(
        (res:inmueble[])=>{
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.changeMode(4);
            this.inmuebles=res;
            this.CloneInmuebles=res;
            this.Total();
          }else{
            this.alertService.error(
              res[0].MENSAJE,
              this.options
            );
          }
        },
        (err) => {
          this.alertService.error(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
            this.options
          );
        }
      );
    } catch (error) {
      this.alertService.error(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
        this.options
      );
    }
  }
  QueryInmueblesEtapa(etapaid:any):void{
    this.Inmueble.idetapa=etapaid;
    try{
      this.inmueblesetapa= this.inmuebles.filter(Inmueble=>{
        return Inmueble.idetapa==etapa;
      })
      console.log(this.inmueblesetapa);
    } catch (error) {
      this.alertService.error(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
        this.options
      );
    }
  }
  QueryOneInmueble(idInmueble: any) {
    this.Inmueble.id = idInmueble;
    try {
      this.InmuebleS.getInmueble(this.Inmueble).subscribe(
        (res: inmueble[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.Inmueble=res[0];
            this.ListarEtapas(this.Inmueble.idproyecto);
            /* console.log(res[0]) */
              this.changeMode(3);
          } else {
            this.alertService.error(res[0].MENSAJE, this.options);
          }
        },
        (err) => {
          this.alertService.error(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
            this.options
          );
        }
      );
    } catch (error) {
      this.alertService.error(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
        this.options
      );
    }
  }
  SaveInmueble() {
    try {
      console.log("entro")
      if (this.validadorInmueble()) {
        console.log("entro al si")
        this.InmuebleS.createInmueble(this.Inmueble).subscribe(
          (res: inmueble[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.QueryInmuebles();
              this.clearDataInmueble();
            } else {
              this.alertService.error(res[0].MENSAJE, this.options);
            }
          },
          (err) => {
            console.log("entro"+ err)
            this.alertService.error(
              "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
              this.options
            );
          }
        );
      }
    } catch (error) {
      console.log("entro"+ error)
      this.alertService.error(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
        this.options
      );
    }
  }
  UpdateInmueble() {
    try {
      if (this.validadorInmueble()) {
        this.InmuebleS.updateInmueble(this.Inmueble).subscribe(
          (res: inmueble[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.clearDataInmueble();
            } else {
              this.alertService.error(res[0].MENSAJE, this.options);
            }
          },
          (err) => {
            this.alertService.error(
              "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
              this.options
            );
          }
        );
      }
    } catch (error) {
      this.alertService.error(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
        this.options
      );
    }
  }
  Total(){
    this.total= this.inmuebles.reduce((
      acc,
      obj,
    ) => acc + (obj.Valor_Final),
    0);
    this.indice= this.inmuebles.length;
  }

  RemoveInmueble(idInmueble: any) {
    this.Inmueble.id = idInmueble;
    try {
      this.InmuebleS.deleteInmueble(this.Inmueble).subscribe(
        (res: inmueble[]) => {
          if (res[0].TIPO == "3") {
            this.alertService.success(res[0].MENSAJE, this.options);
            this.QueryInmuebles();
          } else {
            this.alertService.error(res[0].MENSAJE, this.options);
          }
        },
        (err) => {
          this.alertService.error(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
            this.options
          );
        }
      );
    } catch (error) {
      this.alertService.error(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
        this.options
      );
    }
  }
  async getItems(ev:any){
    const val = ev.target.value;
        if (val && val.trim() !== '') {
          if(this.proyectoid==0){
            this.inmuebles = this.inmuebles.filter((item) => {
              this.Total();
              return (item.proyecto.toLowerCase().indexOf(val.toLowerCase()) > -1);
              });
          }
          else{
            this.inmuebles = this.inmuebles.filter((item) => {
              this.Total();
              return (item.manzana.toLowerCase().indexOf(val.toLowerCase()) > -1);
              });
          }
        } else {
          this.inmuebles=this.CloneInmuebles;
        }
  }
}
