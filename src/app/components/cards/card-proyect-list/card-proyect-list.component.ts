import { Component, Input, OnInit } from '@angular/core';
import { proyecto } from 'src/app/Models/proyecto.model';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { GlobalService } from 'src/app/providers/GlobalService';
import { AlertService } from "../../_alert";

@Component({
  selector: 'app-card-proyect-list',
  templateUrl: './card-proyect-list.component.html',
  /* styleUrls: ['./card-proyect-list.component.css'] */
})
export class CardProyectListComponent implements OnInit {
  Proyecto: proyecto={
    id:"",
    nombre:"",
    ubicacion:"",
    estado:"",
    etapas:"",
    estado_etapa:"",
    manzanas:"",
    TIPO:"",
    MENSAJE:""
  };

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  proyects=[];
  CloneProyects=[];
  idOption:number=1;
  Detalle:string="";
  DetalleEtapa:boolean=false;
  DetalleInmueble:boolean=false;
  edicion:boolean= false;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(private Proyect:ProyectoService,
    protected alertService: AlertService,
    private globalEvents: GlobalService) { }

  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.QueryProyectos();
    }
  }
  ngOnInit(): void {
    this.QueryProyectos();
  }
  public showModal = false;
  public toggleModal() {
  this.showModal = !this.showModal;
  }
  MotrarDetalle(){
    if(this.Detalle==""){
      this.Detalle="Etapa";
    }else{
      this.Detalle="";
    }

  }



  MotrarDetalleEtapa(){
    if(this.Detalle==""){
      this.Detalle="Etapa";
    }else if(this.Detalle=="Inmueble"){
      this.Detalle="Etapa";
    }else{
      this.Detalle="";
    }


  }
  MotrarDetalleInmuebles(){
    if(this.Detalle==""){
      this.Detalle="Inmueble";
    }else if(this.Detalle=="Etapa"){
      this.Detalle="Inmueble";
    }else{
      this.Detalle="";
    }
  }
  clearDataProyect() {
    this.Proyecto = {
      id: "",
      nombre: "",
      ubicacion: "",
      estado:"",
      etapas:"",
      estado_etapa:"",
      manzanas:"",
      MENSAJE: "",
      TIPO: "",
    };
  }

  validadorProyecto() {
    if (
      this.Proyecto.nombre.trim() == "" ||
      this.Proyecto.ubicacion.trim() == ""||
      this.Proyecto.estado==""||
      this.Proyecto.etapas==""||
      this.Proyecto.manzanas==""||
      this.Proyecto.estado_etapa==""

    ) {
      this.alertService.warn("Todos los campos deben estar diligenciados!", this.options);
      return false;
    }else{
      return true;
    }
  }

  QueryProyectos(){
    try{
      this.Proyect.getProyectos().subscribe(
        (res:proyecto[])=>{
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.proyects=res;
            this.CloneProyects=res;
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
  QueryOneProyecto(idProyecto: any) {
    this.Proyecto.id = idProyecto;
    try {
      this.Proyect.getProyecto(this.Proyecto).subscribe(
        (res: proyecto[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.Proyecto=res[0];
            console.log(res[0])
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
  SaveProyecto() {
    try {
      if (this.validadorProyecto()) {
        this.Proyect.createProyecto(this.Proyecto).subscribe(
          (res: proyecto[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.QueryProyectos();
              this.clearDataProyect();
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
  UpdateProyecto() {
    try {
      if (this.validadorProyecto()) {
        this.Proyect.updateProyecto(this.Proyecto).subscribe(
          (res: proyecto[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.clearDataProyect();
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

  RemoveProyecto(idProyecto: any) {
    this.Proyecto.id = idProyecto;
    try {
      this.Proyect.deleteProyecto(this.Proyecto).subscribe(
        (res: proyecto[]) => {
          if (res[0].TIPO == "3") {
            this.alertService.success(res[0].MENSAJE, this.options);
            this.QueryProyectos();
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
          this.proyects = this.proyects.filter((item) => {
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.proyects=this.CloneProyects;
        }
  }
}
