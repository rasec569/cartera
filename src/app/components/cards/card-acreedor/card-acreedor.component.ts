import { Component, Input, OnInit } from '@angular/core';
import { acreedor } from 'src/app/Models/acreedor.model';
import { AcreedorService } from 'src/app/services/acreedor.service';
import { AlertService } from '../../_alert';


@Component({
  selector: 'app-card-acreedor',
  templateUrl: './card-acreedor.component.html'
})
export class CardAcreedorComponent implements OnInit {
  Acreedor:acreedor={
    //persona
    nombres: "",
    apellidos:"",
    telefono:"",
    direccion:"",
    correo:"",
    identificacion:"",
    //usuario
    idacreedor:"",
    descripcion:"",
   //error vars
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
  acreedor=[];
  CloneAcreedor=[];
  idOption:number=1;
  //alert options
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(private AcreedorS:AcreedorService,
    protected alertService: AlertService) { }
    changeMode(option:number){
      this.idOption=option;
      if(option==1){
        this.QueryAcreedores();
      }
    }

  ngOnInit(): void {
    this.QueryAcreedores();
  }
  clearDataAcreedor() {
    this.Acreedor = {
     //persona
    nombres: "",
    apellidos:"",
    telefono:"",
    direccion:"",
    correo:"",
    identificacion:"",
    //usuario
    idacreedor:"",
    descripcion:"",
   //error vars
    TIPO:"",
    MENSAJE:"",
    };
  }
  validadorAcreedor() {
    if (
      this.Acreedor.nombres.trim() == "" ||
      this.Acreedor.apellidos.trim() == ""
    ) {
      this.alertService.warn("Todos los campos deben estar diligenciados!", this.options);
      return false;
    }else{
      return true;
    }
  }
  QueryAcreedores(){
    try{
      this.AcreedorS.getAcreedores().subscribe(
        (res: acreedor[]) => {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.acreedor = res;
            this.CloneAcreedor = res;
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
  QueryOneAcreedor(idAcreedor: any) {
    this.Acreedor.idacreedor = idAcreedor;
    try {
      this.AcreedorS.getAcreedor(this.Acreedor).subscribe(
        (res: acreedor[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.Acreedor=res[0];
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
  SaveAcreedor() {
    try {
      if (this.validadorAcreedor()) {
        this.AcreedorS.createAcreedor(this.Acreedor).subscribe(
          (res: acreedor[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.QueryAcreedores();
              this.clearDataAcreedor();
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
  UpdateAcreedor() {
    try {
      console.log("entro actulizar")
      if (this.validadorAcreedor()) {
        this.AcreedorS.updateAcreedor(this.Acreedor).subscribe(
          (res: acreedor[]) => {
            console.log(this.Acreedor)
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.clearDataAcreedor();
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

  RemoveAcreedor(idAcreedor: any) {
    this.Acreedor.idacreedor = idAcreedor;
    try {
      this.AcreedorS.deleteAcreedor(this.Acreedor).subscribe(
        (res: acreedor[]) => {
          if (res[0].TIPO == "3") {
            this.alertService.success(res[0].MENSAJE, this.options);
            this.QueryAcreedores();
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
          this.acreedor = this.acreedor.filter((item) => {
            return (
              item.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.acreedor=this.CloneAcreedor;
        }
  }

}
