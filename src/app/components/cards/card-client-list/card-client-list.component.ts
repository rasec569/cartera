import { Component, OnInit,Input } from '@angular/core';
import { ClientesService, Clients } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-card-client-list',
  templateUrl: './card-client-list.component.html'
})
export class CardClientListComponent implements OnInit {
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
  /**
   * 1 => Listar Clientes
   * 2 => Crear clientes
   * 3 => Modificar Clientes
   */
   idOption:number=1;
  constructor(private clientes: ClientesService) { }
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
    try {
      this.validationLogin = false;
      this.ValidationMensage = "";

        this.clientes.getClientes().subscribe(
          (res: any) => {
            console.log(res);
            this.users=res[0];
            this.CloneUsers=res[0]
            /*if (res.token != null) {
              localStorage.setItem("token", res.token);
            } else {
              this.validationLogin = true;
              this.ValidationMensage = "Correo/Contraseña incorrectos!";
            }*/
          },
          (err) => {
            this.validationLogin = true;
            this.ValidationMensage =
              "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!";
          }
        );
    } catch (error) {
      this.validationLogin = true;
      this.ValidationMensage =
        "Error en el sistema, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!";
    }
  }

  async getItems(ev: any) {
        //this.initializeItems();
        const val = ev.target.value;
        if (val && val.trim() !== '') {
          this.users = this.users.filter((item) => {
            return (item.identificacion.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.users=this.CloneUsers;
        }
  }
}
