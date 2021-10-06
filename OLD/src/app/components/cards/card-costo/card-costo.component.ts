import { Component, Input, OnInit } from '@angular/core';
import { costo } from 'src/app/Models/costo.model';
import { CostoService } from 'src/app/services/costo.service';
import { GlobalService } from 'src/app/providers/GlobalService';
import { AlertService } from "../../_alert";

@Component({
  selector: "app-card-costo",
  templateUrl: './card-costo.component.html',
  /* styleUrls: ['./card-costo.component.css'] */
})
export class CardCostoComponent implements OnInit {
  Costo:costo={
    id: "",
    concepto: "",
    valor:"",
    fecha: "",
    estado: "",
    idinmueble:"",
    TIPO:"",
    MENSAJE:""
  }
  @Input()
  inmueble:string="";
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
   costos=[];
   CloneCostos=[];
   idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  constructor(private CostoS:CostoService,
    protected alertService: AlertService,
    private globalEvents: GlobalService) { }

    changeMode(option:number){
      this.idOption=option;
      if(option==1){
        this.QueryCostosInmueble(this.inmueble);
      }
    }
  ngOnInit(): void {
    console.log(this.inmueble)
    this.QueryCostosInmueble(this.inmueble);
  }
  public showModal = false;
  public toggleModal() {
  this.showModal = !this.showModal;
  }
  clearDataCosto(){
    this.Costo={
      id: "",
      concepto: "",
      valor:"",
      fecha: "",
      estado: "",
      idinmueble:"",
      TIPO:"",
      MENSAJE:""
    }
  }
  validarCosto(){
    if (
      this.Costo.concepto.trim() == ""
    ) {
      this.alertService.warn("Todos los campos deben estar diligenciados!", this.options);
      return false;
    }else{
      return true;
    }
  }

  QueryCostos(){
    try{
      this.CostoS.getCostos().subscribe(
        (res:costo[])=>{
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.costos=res;
            this.CloneCostos=res;
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
  QueryCostosInmueble(inmueble: any){
    this.Costo.idinmueble= inmueble;
    try{
      this.CostoS.getCostosInmueble(this.Costo).subscribe(
        (res:costo[])=>{
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.costos=res;
            console.log(this.costos);
            this.CloneCostos=res;
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
  QueryOneCosto(idCosto: any) {
    this.Costo.id = idCosto;
    try {
      console.log(costo)
      this.CostoS.getCosto(this.Costo).subscribe(
        (res: costo[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.Costo=res[0];
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
  SaveCosto() {
    console.log(this.Costo);
    try {
      if (this.validarCosto()) {
        this.CostoS.createCosto(this.Costo).subscribe(
          (res: costo[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.QueryCostosInmueble(this.inmueble);
              this.clearDataCosto();
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
  UpdateCosto() {
    console.log('entro');
    try {
      if (this.validarCosto()) {
        console.log('entro if');
        this.CostoS.updateCosto(this.Costo).subscribe(
          (res: costo[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.clearDataCosto();
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

  RemoveCosto(idcosto: any) {
    this.Costo.id = idcosto;
    try {
      this.CostoS.deleteCosto(this.Costo).subscribe(
        (res: costo[]) => {
          if (res[0].TIPO == "3") {
            this.alertService.success(res[0].MENSAJE, this.options);
            this.QueryCostosInmueble(this.inmueble);
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
          this.costos = this.costos.filter((item) => {
            return (item.numero.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.costos=this.CloneCostos;
        }
  }

}
