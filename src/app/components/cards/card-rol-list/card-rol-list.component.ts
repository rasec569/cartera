import { Component, Input, OnInit } from '@angular/core';
import { RolService, Rol} from 'src/app/services/rol.service';

@Component({
  selector: 'app-card-rol-list',
  templateUrl: './card-rol-list.component.html',
 /*  styleUrls: ['./card-rol-list.component.css'] */
})
export class CardRolListComponent implements OnInit {

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
validationLogin: boolean = false;
ValidationMensage: string = "";
idOption:number=1;
  constructor(private Rol:RolService) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.refreshRol();
    }
  }
  ngOnInit() {
    this.refreshRol();
  }

  refreshRol(){
    try{
      this.validationLogin = false;
      this.ValidationMensage = "";
      this.Rol.getRoles().subscribe(
        (res:any)=>{
          console.log(res);
          this.roles=res[0];
          this.CloneRoles=res[0];
        }, (err)=> {
            this.validationLogin = true;
            this.ValidationMensage =
              "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!";
        }
      );
    }catch (error) {
      this.validationLogin = true;
      this.ValidationMensage =
        "Error en el sistema, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!";
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
