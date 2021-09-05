import { Component, OnInit, Input } from "@angular/core";
import { cliente } from "src/app/Models/cliente.model";
import { clienteInterface } from "src/app/interfaces/cliente.interface"
import { ClientesService } from "src/app/services/clientes.service";
import { AlertService } from "../../_alert";

@Component({
  selector: "app-card-client-list",
  templateUrl: "./card-client-list.component.html",
})
export class CardClientListComponent implements OnInit {
  Cliente: cliente={
    id:"",
    nombres:"",
    apellidos:"",
    correo:"",
    direccion:"",
    identification:"",
    telefono:"",
    MENSAJE:"",
    TIPO:""
  };

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  users = [];
  CloneUsers = [];
  /**
   * 1 => Listar Clientes
   * 2 => Crear clientes
   * 3 => Modificar Clientes
   * 3 => Eliminar Cliente
   */
  idOption: number = 1;
  //alert options
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  constructor(
    private clientes: ClientesService,
    protected alertService: AlertService
  ) {

  }

  changeMode(option: number) {
    this.idOption = option;
    if (option == 1) {
      this.QueryClient();
    }
  }
  ngOnInit(): void {
    this.QueryClient();
  }
  public showModal = false;
  public toggleModal() {
    this.showModal = !this.showModal;
  }
  /***
   * Cliente Operations
   */
  QueryClient() {
    try {
      this.clientes.getClientes().subscribe(
        (res: cliente[]) => {
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
    } catch (error) {
      this.alertService.error(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!",
        this.options
      );
    }
  }
  SaveCLiente(){

  }

  UpdateCliente(){

  }

  RemoveCliente(idCliente:any){
    this.Cliente.id=idCliente;
    try {
      this.clientes.deleteCliente(this.Cliente).subscribe(
        (res: cliente[]) => {
          if(res[0].TIPO=="3"){
            this.alertService.success(
              res[0].MENSAJE,
              this.options
            );
            this.QueryClient();
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

  async getItems(ev: any) {
    //this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== "") {
      this.users = this.users.filter((item) => {
        return (
          item.identificacion.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    } else {
      this.users = this.CloneUsers;
    }
  }
}
