import { Component, Input, OnInit } from '@angular/core';
import { area } from 'src/app/Models/area.model';
import { AreasService } from 'src/app/services/areas.service';
import { GlobalService } from 'src/app/providers/GlobalService';
import { AlertService } from "../../_alert";

@Component({
  selector: 'app-card-area-list',
  templateUrl: './card-area-list.component.html',
  /* styleUrls: ['./card-area-list.component.css'] */
})
export class CardAreaListComponent implements OnInit {
  Area: area={
    id: "",
    nombre: "",
    descripcion: "",
    estado: "",
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
  areas=[];
  CloneAreas=[];
  /* ValidationMensage: string = ""; */
  idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(private AreaS:AreasService,
    protected alertService: AlertService,
    private globalEvents: GlobalService) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.QueryAreas();
    }
  }
  ngOnInit(): void {
    this.QueryAreas();
  }
  public showModal = false;
  public toggleModal() {
  this.showModal = !this.showModal;
  }
  clearDataArea() {
    this.Area = {
      id: "",
      nombre: "",
      descripcion: "",
      estado: "",
      MENSAJE: "",
      TIPO: "",
    };
  }
  validadorArea() {
    if (
      this.Area.nombre.trim() == "" ||
      this.Area.descripcion.trim() == ""
    ) {
      this.alertService.warn("Todos los campos deben estar diligenciados!", this.options);
      return false;
    }else{
      return true;
    }
  }
  QueryAreas(){
    try{
      this.AreaS.getAreas().subscribe(
        (res:area[])=>{
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.areas=res;
            this.CloneAreas=res;
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
  QueryOneArea(idArea: any) {
    this.Area.id = idArea;
    try {
      this.AreaS.getArea(this.Area).subscribe(
        (res: area[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.Area=res[0];
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
  SaveArea() {
    try {
      if (this.validadorArea()) {
        this.AreaS.createArea(this.Area).subscribe(
          (res: area[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.QueryAreas();
              this.clearDataArea();
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
  UpdateArea() {
    try {
      if (this.validadorArea()) {
        this.AreaS.updateArea(this.Area).subscribe(
          (res: area[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.clearDataArea();
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

  RemoveArea(idArea: any) {
    this.Area.id = idArea;
    try {
      this.AreaS.deleteArea(this.Area).subscribe(
        (res: area[]) => {
          if (res[0].TIPO == "3") {
            this.alertService.success(res[0].MENSAJE, this.options);
            this.QueryAreas();
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
          this.areas = this.areas.filter((item) => {
            return (item.Rol.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.areas=this.CloneAreas;
        }
  }
}
