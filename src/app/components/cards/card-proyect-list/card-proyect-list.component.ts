import { Component, Input, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-card-proyect-list',
  templateUrl: './card-proyect-list.component.html',
  /* styleUrls: ['./card-proyect-list.component.css'] */
})
export class CardProyectListComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
proyects=[];
CloneProyects=[];
validationLogin: boolean = false;
ValidationMensage: string = "";
idOption:number=1;
  constructor(private Proyecto:ProyectoService) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.refreshProyects();
    }
  }
  ngOnInit(): void {
    this.refreshProyects();
  }
  refreshProyects(){
    try{
      this.validationLogin = false;
      this.ValidationMensage = "";
      this.Proyecto.getProyectos().subscribe(
        (res:any)=>{
          console.log(res);
          this.proyects=res[0];
          this.CloneProyects=res[0];
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
          this.proyects = this.proyects.filter((item) => {
            return (item.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.proyects=this.CloneProyects;
        }
  }
}
