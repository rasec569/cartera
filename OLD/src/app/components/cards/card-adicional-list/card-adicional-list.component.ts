import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/GlobalService';
import { AlertService } from "../../_alert";
import { AdicionalService } from 'src/app/services/adicional.service';
import { adicional } from 'src/app/Models/adicional.model';


@Component({
  selector: 'app-card-adicional-list',
  templateUrl: './card-adicional-list.component.html',
  styleUrls: ['./card-adicional-list.component.css']
})
export class CardAdicionalListComponent implements OnInit {
  Adicional:adicional={
    id:"",
    concepto:"",
    valor:"",
    estado:"",
    fecha:"",
    contratoid:"",
    TIPO:"",
    MENSAJE:""
  }
  @Input()
  contrato:string='0';
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  adicionales=[];
  ClonarAdicionales=[];
  idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(private AdicionalS:AdicionalService,
    protected alertService: AlertService,
    private globalEvents: GlobalService) { }
    changeMode(option:number){
      this.idOption=option;
      if(option==1){
        /* this.ListarAdicionales(this.proyecto); */
      }
    }
  ngOnInit() {
  }
  public showModal = false;
  public toggleModal() {
  this.showModal = !this.showModal;
  }
  clearDataAdicional(){
    this.Adicional={
      id:"",
      concepto:"",
      valor:"",
      estado:"",
      fecha:"",
      contratoid:"",
      TIPO:"",
      MENSAJE:"",
    }
  }
  validadorAdicional() {
    if (
      this.Adicional.concepto.trim() == ""
    ) {
      this.alertService.warn("Todos los campos deben estar diligenciados!", this.options);
      return false;
    }else{
      return true;
    }
  }
  QueryAdicionalesContrato(contratoid: any){
    this.Adicional.contratoid=contratoid;
    try{
      this.AdicionalS.getAdicionalesContrato(this.Adicional).subscribe(
        (res: adicional[])=>{
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.adicionales=res;
            this.ClonarAdicionales=res;
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
  QueryOneAdicional(idAdicional: any) {
    this.Adicional.id = idAdicional;
    try {
      this.AdicionalS.getAdicional(this.Adicional).subscribe(
        (res: adicional[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.Adicional=res[0];
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
  SaveAdicional() {
    this.Adicional.contratoid=this.contrato
    try {
      if (this.validadorAdicional()) {
        this.AdicionalS.createAdicional(this.Adicional).subscribe(
          (res: adicional[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.QueryAdicionalesContrato(this.contrato);
              this.clearDataAdicional();
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
  UpdateAdicional() {
    console.log('entro');
    try {
      if (this.validadorAdicional()) {
        this.AdicionalS.updateAdicional(this.Adicional).subscribe(
          (res: adicional[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.clearDataAdicional();
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

  RemoveAdicional(id: any) {
    this.Adicional.id = id;
    try {
      this.AdicionalS.deleteAdicional(this.Adicional).subscribe(
        (res: adicional[]) => {
          if (res[0].TIPO == "3") {
            this.alertService.success(res[0].MENSAJE, this.options);
            this.QueryAdicionalesContrato(this.contrato);
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
          this.adicionales = this.adicionales.filter((item) => {
            return (item.numero.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.adicionales=this.ClonarAdicionales;
        }
  }
}
