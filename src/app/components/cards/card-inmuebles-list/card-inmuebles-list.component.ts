import { Component, Input, OnInit } from '@angular/core';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { inmueble } from 'src/app/Models/inmueble.model';
import { GlobalService } from 'src/app/providers/GlobalService';
import { AlertService } from "../../_alert";

@Component({
  selector: 'app-card-inmuebles-list',
  templateUrl: './card-inmuebles-list.component.html',
  /* styleUrls: ['./card-inmuebles-list.component.css'] */
})
export class CardInmueblesListComponent implements OnInit {
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
    proyecto:"",
    TIPO:"",
    MENSAJE:""
  }
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  inmuebles=[];
  CloneInmuebles=[];
  idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
    constructor(private InmuebleS:InmuebleService,
      protected alertService: AlertService,
      private globalEvents: GlobalService) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.QueryInmuebles();
    }
  }
  ngOnInit(): void {
    this.QueryInmuebles();
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
      proyecto:"",
      TIPO:"",
      MENSAJE:""
    };
  }
  validadorInmueble() {
    if (
      this.Inmueble.manzana.trim() == "" ||
      this.Inmueble.casa.trim() == ""
    ) {
      this.alertService.warn("Todos los campos deben estar diligenciados!", this.options);
      return false;
    }else{
      return true;
    }
  }
  QueryInmuebles(){
    try{
      this.InmuebleS.getInmuebles().subscribe(
        (res:inmueble[])=>{
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.inmuebles=res;
            this.CloneInmuebles=res;
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
  QueryOneInmueble(idInmueble: any) {
    this.Inmueble.id = idInmueble;
    try {
      this.InmuebleS.getInmueble(this.Inmueble).subscribe(
        (res: inmueble[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.Inmueble=res[0];
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
      if (this.validadorInmueble()) {
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
          this.inmuebles = this.inmuebles.filter((item) => {
            return (item.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.inmuebles=this.CloneInmuebles;
        }
  }
}
