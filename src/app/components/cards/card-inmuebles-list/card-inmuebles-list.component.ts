import { Component, Input, OnInit } from '@angular/core';
import { InmuebleService } from 'src/app/services/inmueble.service';

@Component({
  selector: 'app-card-inmuebles-list',
  templateUrl: './card-inmuebles-list.component.html',
  /* styleUrls: ['./card-inmuebles-list.component.css'] */
})
export class CardInmueblesListComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
inmuebles=[];
CloneInmuebles=[];
validationLogin: boolean = false;
ValidationMensage: string = "";
idOption:number=1;
  constructor(private Inmueble:InmuebleService) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.refreshInmueble();
    }
  }
  ngOnInit(): void {
    this.refreshInmueble();
  }
  refreshInmueble(){
    try{
      this.validationLogin = false;
      this.ValidationMensage = "";
      this.Inmueble.getInmuebles().subscribe(
        (res:any)=>{
          console.log(res);
          this.inmuebles=res[0];
          this.CloneInmuebles=res[0];
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
          this.inmuebles = this.inmuebles.filter((item) => {
            return (item.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.inmuebles=this.CloneInmuebles;
        }
  }
}
