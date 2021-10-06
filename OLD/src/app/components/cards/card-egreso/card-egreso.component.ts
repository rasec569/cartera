import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/GlobalService';
import { AlertService } from "../../_alert";
import { EgresoService } from 'src/app/services/egreso.service';
import { egreso } from 'src/app/Models/egreso.model';

@Component({
  templateUrl: './card-egreso.component.html',
  selector: 'app-card-egreso'
})
export class CardEgresoComponent implements OnInit {

  Egreso:egreso={
    id:"",
    numero:"",
    fecha:"",
    referencia:"",
    valor:"",
    obligacionid:"",
    TIPO:"",
    MENSAJE:""
  }
  @Input()
  obligacion:string='1';
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  egresos=[];
  CloneEgresos=[];
  idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(private EgresoS:EgresoService,
    protected alertService: AlertService,
    private globalEvents: GlobalService) { }

    changeMode(option:number){
      this.idOption=option;
      if(option==1){
        this.QueryEgresosObligacion(this.obligacion);
        /* this.QueryEgresos(); */
      }
    }

  ngOnInit(): void {
    this.QueryEgresosObligacion(this.obligacion);
    /* this.QueryEgresos(); */
  }
  public showModal = false;
  public toggleModal() {
  this.showModal = !this.showModal;
  }
  clearDataEgreso(){
    this.Egreso={
      id:"",
      numero:"",
      fecha:"",
      referencia:"",
      valor:"",
      obligacionid:"",
      TIPO:"",
      MENSAJE:""
    }
  }
  validarEgreso(){
    if (
      this.Egreso.referencia.trim() == ""
    ) {
      this.alertService.warn("Todos los campos deben estar diligenciados!", this.options);
      return false;
    }else{
      return true;
    }
  }
  QueryEgresos(){
    try{
      this.EgresoS.getEgresos().subscribe(
        (res: egreso[]) => {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.egresos = res;
            this.CloneEgresos = res;
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
    }catch (error) {
      this.alertService.error(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
        this.options
      );
    }
  }
  QueryEgresosObligacion(obligacionid:any){
    this.Egreso.obligacionid=obligacionid;
    try{
      this.EgresoS.getEgresosObligacion(this.Egreso).subscribe(
        (res: egreso[])=>{
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.egresos=res;
            this.CloneEgresos=res;
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
    }catch (error) {
      this.alertService.error(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
        this.options
      );
    }
  }
  QueryOneEgreso(idEgreso: any) {
    this.Egreso.id = idEgreso;
    try {
      this.EgresoS.getEgreso(this.Egreso).subscribe(
        (res: egreso[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.Egreso=res[0];
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
  SaveEgreso() {
    this.Egreso.obligacionid=this.obligacion
    try {
      if (this.validarEgreso()) {
        this.EgresoS.createEgreso(this.Egreso).subscribe(
          (res: egreso[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.QueryEgresosObligacion(this.obligacion);
              this.clearDataEgreso();
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
  UpdateEgreso() {
    console.log('entro');
    try {
      if (this.validarEgreso()) {
        this.EgresoS.updateEgreso(this.Egreso).subscribe(
          (res: egreso[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.clearDataEgreso();
            } else {
              console.log('error');
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

  RemoveEgreso(id: any) {
    this.Egreso.id = id;
    try {
      this.EgresoS.deleteEgreso(this.Egreso).subscribe(
        (res: egreso[]) => {
          if (res[0].TIPO == "3") {
            this.alertService.success(res[0].MENSAJE, this.options);
            this.QueryEgresosObligacion(this.obligacion);
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
          this.egresos = this.egresos.filter((item) => {
            return (item.numero.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.egresos=this.CloneEgresos;
        }
  }
}
