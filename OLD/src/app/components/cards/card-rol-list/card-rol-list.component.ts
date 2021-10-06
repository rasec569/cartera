import { Component, Input, OnInit } from '@angular/core';
import { rol } from 'src/app/Models/rol.model';
import { GlobalService } from 'src/app/providers/GlobalService';
import { RolService} from 'src/app/services/rol.service';
import { AlertService } from "../../_alert";

@Component({
  selector: 'app-card-rol-list',
  templateUrl: './card-rol-list.component.html',
 /*  styleUrls: ['./card-rol-list.component.css'] */
})
export class CardRolListComponent implements OnInit {
  Rol: rol={
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
  roles=[];
  CloneRoles=[];
  ValidationMensage: string = "";
  idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(private RolS:RolService,
    protected alertService: AlertService,
    private globalEvents: GlobalService) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.QueryRoles();
    }
  }
  ngOnInit() {
    this.QueryRoles();
  }
  public showModal = false;
  public toggleModal() {
  this.showModal = !this.showModal;
  }
  clearDataRol() {
    this.Rol = {
      id: "",
      nombre: "",
      descripcion: "",
      estado:"",
      MENSAJE: "",
      TIPO: "",
    };
  }
  validadorRol() {
    if (
      this.Rol.nombre.trim() == "" ||
      this.Rol.descripcion.trim() == ""
    ) {
      this.alertService.warn("Todos los campos deben estar diligenciados!", this.options);
      return false;
    }else{
      return true;
    }
  }
  QueryRoles(){
    try{
      this.RolS.getRoles().subscribe(
        (res:rol[])=>{
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.roles=res;
            this.CloneRoles=res;
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
  QueryOneRol(idRol: any) {
    this.Rol.id = idRol;
    try {
      this.RolS.getRol(this.Rol).subscribe(
        (res: rol[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.Rol=res[0];
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
  SaveRol() {
    try {
      if (this.validadorRol()) {
        this.RolS.createRol(this.Rol).subscribe(
          (res: rol[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.QueryRoles();
              this.clearDataRol();
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
  UpdateRol() {
    try {
      if (this.validadorRol()) {
        this.RolS.updateRol(this.Rol).subscribe(
          (res: rol[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.clearDataRol();
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

  RemoveRol(idRol: any) {
    this.Rol.id = idRol;
    try {
      this.RolS.deleteRol(this.Rol).subscribe(
        (res: rol[]) => {
          if (res[0].TIPO == "3") {
            this.alertService.success(res[0].MENSAJE, this.options);
            this.QueryRoles();
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
          this.roles = this.roles.filter((item) => {
            return (item.Rol.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.roles=this.CloneRoles;
        }
  }
}
