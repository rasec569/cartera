import { Component, Input, OnInit } from '@angular/core';
import { usuario } from 'src/app/Models/usuario.model';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../../_alert';
import {rol} from 'src/app/Models/rol.model';
import { RolService } from 'src/app/services/rol.service';
import {area} from 'src/app/Models/area.model';
import { AreasService } from 'src/app/services/areas.service';

@Component({
  selector: 'app-card-user-list',
  templateUrl: './card-user-list.component.html',
  /* styleUrls: ['./card-user-list.component.css'] */
})
export class CardUserListComponent implements OnInit {
  Usuario:usuario={
    //persona
    nombres: "",
    apellidos:"",
    telefono:"",
    direccion:"",
    correo:"",
    identification:"",
    //usuario
    iduser:"",
    usuario:"",
    password: "",
    IdRol:"",
    IdArea:"",
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
  users=[];
  CloneUsers=[];
  listRol=[];
  listArea=[];
  /* validationLogin: boolean = false;
  ValidationMensage: string = ""; */
  idOption:number=1;
  //alert options
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(private User:UserService,
    private Area:AreasService,
    private Rol:RolService,
    protected alertService: AlertService) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.QueryUser();
    }
  }
  ngOnInit(): void {
    this.QueryUser();
    this.listarRol();
    this.listarArea()
  }
  public showModal = false;
  public toggleModal() {
  this.showModal = !this.showModal;
  }
  clearDataUsuario() {
    this.Usuario = {
     //persona
    nombres: "",
    apellidos:"",
    telefono:"",
    direccion:"",
    correo:"",
    identification:"",
    //usuario
    iduser:"",
    usuario:"",
    password: "",
    IdRol:"",
    IdArea:"",
   //error vars
    TIPO:"",
    MENSAJE:"",
    };
  }
  validadorUsuario() {
    if (
      this.Usuario.nombres.trim() == "" ||
      this.Usuario.apellidos.trim() == ""
    ) {
      this.alertService.warn("Todos los campos deben estar diligenciados!", this.options);
      return false;
    }else{
      return true;
    }
  }
  listarRol(){
    try {
      this.Rol.getRoles().subscribe(
        (res:rol[])=> {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.listRol=res;
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
  listarArea(){
    try {
      this.Area.getAreas().subscribe(
        (res:area[])=> {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            console.log(res)
            this.listArea=res;
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
  QueryUser(){
    try{
      this.User.getUsuarios().subscribe(
        (res: usuario[]) => {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.users = res;
            this.CloneUsers = res;
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
  QueryOneUsuario(idUsuario: any) {
    this.Usuario.iduser = idUsuario;
    try {
      this.User.getUsuario(this.Usuario).subscribe(
        (res: usuario[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.Usuario=res[0];
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
  SaveUsuario() {
    try {
      if (this.validadorUsuario()) {
        this.User.createUsuarrio(this.Usuario).subscribe(
          (res: usuario[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.QueryUser();
              this.clearDataUsuario();
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
  UpdateUsuario() {
    try {
      if (this.validadorUsuario()) {
        this.User.updateUsuario(this.Usuario).subscribe(
          (res: usuario[]) => {
            console.log(this.Usuario)
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.clearDataUsuario();
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

  RemoveUsuario(idUsuario: any) {
    this.Usuario.iduser = idUsuario;
    try {
      this.User.deleteUsuario(this.Usuario).subscribe(
        (res: usuario[]) => {
          if (res[0].TIPO == "3") {
            this.alertService.success(res[0].MENSAJE, this.options);
            this.QueryUser();
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
          this.users = this.users.filter((item) => {
            return (
              item.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.users=this.CloneUsers;
        }
  }

}
