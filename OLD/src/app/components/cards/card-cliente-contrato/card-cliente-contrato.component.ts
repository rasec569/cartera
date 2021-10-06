import { Component, OnInit, Input } from "@angular/core";
import { cliente } from "src/app/Models/cliente.model";
import { clienteInterface } from "src/app/interfaces/cliente.interface";
import { ClientesService } from "src/app/services/clientes.service";
import { AlertService } from "../../_alert";
import { GlobalService } from "../../../providers/GlobalService";
import { Stats } from "src/app/Models/Utils/Stats.model";

@Component({
  selector: 'app-card-cliente-contrato',
  templateUrl: './card-cliente-contrato.component.html',
  styleUrls: ['./card-cliente-contrato.component.css']
})
export class CardClienteContratoComponent implements OnInit {

  Cliente: cliente = {
    id: "",
    nombres: "",
    apellidos: "",
    correo: "",
    direccion: "",
    identification: "",
    telefono: "",
    MENSAJE: "",
    TIPO: "",
  };
  StatsData: Stats[] = [
    {
      ColorIcon: "bg-red-500",
      DataNumber: "10.24",
      Icon: "far fa-chart-bar",
      Name: "TRAFICO DE RED",
      shortDescription: "",
    },
    {
      ColorIcon: "bg-pink-500",
      DataNumber: "358",
      Icon: "fas fa-chart-pie",
      Name: "NUEVOS CLIENTES",
      shortDescription: "",
    },
    {
      ColorIcon: "bg-orange-500",
      DataNumber: "21.5",
      Icon: "fas fa-users",
      Name: "VENTAS",
      shortDescription: "",
    },
    /*
    ,
    {
      ColorIcon:"bg-emerald-500",
      DataNumber:"10.24",
      Icon:"fas fa-percent",
      Name:"RENDIMIENTOS",
      shortDescription:""
    }
    */
  ];
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
   * 4 => Eliminar Cliente
   */
  idOption: number = 1;
  //alert options
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  constructor(
    private clientes: ClientesService,
    protected alertService: AlertService,
    private globalEvents: GlobalService
  ) {}

  changeMode(option: number) {
    this.idOption = option;
    if (option == 1) {
      this.QueryClient();
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.globalEvents.publishSomeData({
        val: this.StatsData,
      });
    }, 1000);
    this.QueryClient();
  }
  public showModal = false;
  public toggleModal() {
    this.showModal = !this.showModal;
  }
  clearDataClient() {
    this.Cliente = {
      id: "",
      nombres: "",
      apellidos: "",
      correo: "",
      direccion: "",
      identification: "",
      telefono: "",
      MENSAJE: "",
      TIPO: "",
    };
  }

  validadorCliente() {
    if (
      this.Cliente.nombres.trim() == "" ||
      this.Cliente.apellidos.trim() == "" ||
      this.Cliente.correo.trim() == "" ||
      this.Cliente.direccion.trim() == "" ||
      this.Cliente.telefono == "" ||
      this.Cliente.identification == ""
    ) {
      this.alertService.warn("Todos los campos deben estar diligenciados!", this.options);
      return false;
    } else {
      if (
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          this.Cliente.correo
        )
      ) {
        return true;
      } else {
        this.alertService.warn(
          "El campo de Email no está diligenciado de forma correcta!", this.options
        );
        return false;
      }
    }
  }
  /***
   * Cliente Operations
   */
  QueryClient() {
    try {
      this.clientes.getClientes().subscribe(
        (res: cliente[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.users = res;
            this.CloneUsers = res;
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
  QueryOneClient(idCliente: any) {
    this.Cliente.id = idCliente;
    try {
      this.clientes.getCliente(this.Cliente).subscribe(
        (res: cliente[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.Cliente=res[0];
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

  SaveCLiente() {
    try {
      if (this.validadorCliente()) {
        this.clientes.createCliente(this.Cliente).subscribe(
          (res: cliente[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.QueryClient();
              this.clearDataClient();
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

  UpdateCliente() {
    try {
      if (this.validadorCliente()) {
        this.clientes.updateCliente(this.Cliente).subscribe(
          (res: cliente[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.clearDataClient();
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

  RemoveCliente(idCliente: any) {
    this.Cliente.id = idCliente;
    try {
      this.clientes.deleteCliente(this.Cliente).subscribe(
        (res: cliente[]) => {
          if (res[0].TIPO == "3") {
            this.alertService.success(res[0].MENSAJE, this.options);
            this.QueryClient();
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
