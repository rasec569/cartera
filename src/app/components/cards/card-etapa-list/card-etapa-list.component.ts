import { Component, Input, OnInit } from '@angular/core';
import { EtapaService } from 'src/app/services/etapa.service';
import { etapa } from 'src/app/Models/etapa.model'
import { GlobalService } from 'src/app/providers/GlobalService';
import { AlertService } from "../../_alert";

@Component({
  selector: 'app-card-etapa-list',
  templateUrl: './card-etapa-list.component.html',
  styleUrls: ['./card-etapa-list.component.css']
})
export class CardEtapaListComponent implements OnInit {

  Etapa:etapa={
    id:"",
    numero:"",
    valor:"",
    estado:"",
    manzana:"",
    idproyecto:"",
    TIPO:"",
    MENSAJE:""
  }
  @Input()
  proyecto:number=0;

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  listEtapa=[];
  ClonelistEtapa=[];
  idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  constructor(private EtapaS:EtapaService,
    protected alertService: AlertService,
    private globalEvents: GlobalService) { }

    changeMode(option:number){
      this.idOption=option;
      if(option==1){
        this.ListarEtapas(this.proyecto);
      }
    }
  ngOnInit(): void {
    this.ListarEtapas(this.proyecto);
  }
  public showModal = false;
  public toggleModal() {
  this.showModal = !this.showModal;
  }
  clearDataEtapa(){
    this.Etapa={
      id:"",
      numero:"",
      valor:"",
      estado:"",
      manzana:"",
      idproyecto:"",
      TIPO:"",
      MENSAJE:"",
    }
  }
  validadorEtapa() {
    if (
      this.Etapa.numero.trim() == ""
    ) {
      this.alertService.warn("Todos los campos deben estar diligenciados!", this.options);
      return false;
    }else{
      return true;
    }
  }

  ListarEtapas(idProyecto:any):void{
    this.Etapa.idproyecto=idProyecto;
    try {
      this.EtapaS.getEtapasProyecto(this.Etapa).subscribe(
        (res: etapa[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.listEtapa=res;
            this.ClonelistEtapa=res;
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
  QueryOneEtapa(idProyecto: any) {
    this.Etapa.id = idProyecto;
    try {
      this.EtapaS.getEtapa(this.Etapa).subscribe(
        (res: etapa[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.Etapa=res[0];
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
  SaveEtapa() {
    try {
      if (this.validadorEtapa()) {
        this.EtapaS.createEtapa(this.Etapa).subscribe(
          (res: etapa[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.ListarEtapas(this.proyecto);
              this.clearDataEtapa();
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
  UpdateEtapa() {
    try {
      if (this.validadorEtapa()) {
        this.EtapaS.updateEtapa(this.Etapa).subscribe(
          (res: etapa[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.clearDataEtapa();
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

  RemoveEtapa(idProyecto: any) {
    this.Etapa.id = idProyecto;
    try {
      this.EtapaS.deleteEtapa(this.Etapa).subscribe(
        (res: etapa[]) => {
          if (res[0].TIPO == "3") {
            this.alertService.success(res[0].MENSAJE, this.options);
            this.ListarEtapas(this.proyecto);
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
          this.listEtapa = this.listEtapa.filter((item) => {
            return (item.numero.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.listEtapa=this.ClonelistEtapa;
        }
  }

}
