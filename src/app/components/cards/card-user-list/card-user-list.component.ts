import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card-user-list',
  templateUrl: './card-user-list.component.html',
  /* styleUrls: ['./card-user-list.component.css'] */
})
export class CardUserListComponent implements OnInit {
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
  constructor(private User:UserService) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.refreshUser();
    }
  }
  ngOnInit(): void {
    this.refreshUser();
  }
  refreshUser(){
    try{
      console.log('por aqui paso');
      this.validationLogin = false;
      this.ValidationMensage = "";
      this.User.getUsuarios().subscribe(
        (res:any)=>{
          console.log(res);
          this.users=res[0];
          this.CloneUsers=res[0];
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
          this.users = this.users.filter((item) => {
            return (item.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.users=this.CloneUsers;
        }
  }
}
