import { Component, Input, OnInit } from '@angular/core';
import { usuario } from 'src/app/Models/usuario.model';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../../_alert';

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
    Rol:"",
    Area:"",
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
  validationLogin: boolean = false;
  ValidationMensage: string = "";
  idOption:number=1;
  //alert options
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(private User:UserService,
    protected alertService: AlertService) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.QueryUser();
    }
  }
  ngOnInit(): void {
    this.QueryUser();
  }
  public showModal = false;
  public toggleModal() {
  this.showModal = !this.showModal;
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
