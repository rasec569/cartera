import { Component, Input, OnInit } from '@angular/core';
import { AreasService } from 'src/app/services/areas.service';

@Component({
  selector: 'app-card-area-list',
  templateUrl: './card-area-list.component.html',
  /* styleUrls: ['./card-area-list.component.css'] */
})
export class CardAreaListComponent implements OnInit {

  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
areas=[];
CloneAreas=[];
validationLogin: boolean = false;
ValidationMensage: string = "";
idOption:number=1;

  constructor(private Area:AreasService) { }
  changeMode(option:number){
    this.idOption=option;
    if(option==1){
      this.refreshAreas();
    }
  }
  ngOnInit(): void {
    this.refreshAreas();
  }
  refreshAreas(){
    try{
      this.validationLogin = false;
      this.ValidationMensage = "";
      this.Area.getAreas().subscribe(
        (res:any)=>{
          console.log(res);
          this.areas=res[0];
          this.CloneAreas=res[0];
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
          this.areas = this.areas.filter((item) => {
            return (item.Rol.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.areas=this.CloneAreas;
        }
  }
}
