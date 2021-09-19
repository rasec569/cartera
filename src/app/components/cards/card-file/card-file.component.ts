import { Component, OnInit, Input } from "@angular/core";
import { AlertService } from "../../_alert";
import { GlobalService } from "../../../providers/GlobalService";
import { Stats } from "src/app/Models/Utils/Stats.model";
import { FilesService } from "src/app/services/files.service";
import { file } from "src/app/Models/file.model";
@Component({
  selector: 'app-card-file',
  templateUrl: './card-file.component.html',
  styleUrls: ['./card-file.component.css']
})
export class CardFileComponent implements OnInit {
  Files: file = {
    nombreReal:'',
    estadoArchivo:'',
    rutaRelativa:'',
    MENSAJE:'',
    TIPO:'',
    fechaCreacion:'',
    fechaModificacion:'',
    idArchivo:''
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
      Icon: "fas fa-Ufiles",
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
  Ufiles = [];
  CloneFiles = [];
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
  uploadedFiles: Array < File > ;
  constructor(
    private files: FilesService,
    protected alertService: AlertService,
    private globalEvents: GlobalService
  ) {}

  changeMode(option: number) {
    this.idOption = option;
    if (option == 1) {
      this.QueryFile();
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.globalEvents.publishSomeData({
        val: this.StatsData,
      });
    }, 1000);
    this.QueryFile();
  }
  public showModal = false;
  public toggleModal() {
    this.showModal = !this.showModal;
  }
  clearDataFile() {
    this.Files = {
      nombreReal:'',
      estadoArchivo:'',
      rutaRelativa:'',
      MENSAJE:'',
      TIPO:'',
      fechaCreacion:'',
      fechaModificacion:'',
      idArchivo:''
    };
  }

  validadorCliente() {
    /*if (
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
    }*/
  }
  /***
   * Cliente Operations
   */
  QueryFile() {
    try {
      this.files.getfiles().subscribe(
        (res: file[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.Ufiles = res;
            this.CloneFiles = res;
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
    /*try {
      if (this.validadorCliente()) {
        this.clientes.createCliente(this.Cliente).subscribe(
          (res: cliente[]) => {
            if (res[0].TIPO == "3") {
              this.alertService.success(res[0].MENSAJE, this.options);
              this.changeMode(1);
              this.QueryFile();
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
    }*/
  }
  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.files.createfiles(formData).subscribe((res)=> {
      console.log('response received is ', res);
    });
    }

  RemoveFile(idFile: any) {
    this.Files.idArchivo = idFile;
    try {
      this.files.deletefiles(this.Files).subscribe(
        (res: file[]) => {
          if (res[0].TIPO == "3") {
            this.alertService.success(res[0].MENSAJE, this.options);
            this.QueryFile();
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
      this.Ufiles = this.Ufiles.filter((item) => {
        return (
          item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    } else {
      this.Ufiles = this.CloneFiles;
    }
  }
}
