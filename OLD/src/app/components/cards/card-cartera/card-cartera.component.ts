import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/GlobalService';
import { AlertService } from "../../_alert";
import { CarteraService } from 'src/app/services/cartera.service';
import { cartera } from 'src/app/Models/cartera.model';

@Component({
  selector: 'app-card-cartera',
  templateUrl: './card-cartera.component.html',
  styleUrls: ['./card-cartera.component.css']
})
export class CardCarteraComponent implements OnInit {
  openTab = 1;
  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
  Cartera:cartera={
    id:"",
    estado:"",
    recaudado:"",
    saldo:"",
    total:"",
    clienteid:"",
    TIPO:"",
    MENSAJE:""
  }
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  carteras=[];
  CloneCarteras=[];
  idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(private CarteraS:CarteraService,
    protected alertService: AlertService,
    private globalEvents: GlobalService) { }
    changeMode(option:number){
      this.idOption=option;
      if(option==1){
        this.QueryCarteras();
      }
    }

  ngOnInit(): void {
    this.QueryCarteras();
  }
  public showModal = false;
  public toggleModal() {
  this.showModal = !this.showModal;
  }
  clearDataCartera(){
    this.Cartera={
      id:"",
      estado:"",
      recaudado:"",
      saldo:"",
      total:"",
      clienteid:"",
      TIPO:"",
      MENSAJE:""
    }
  }
  QueryCarteras(){
    try{
      this.CarteraS.getCartera().subscribe(
        (res: cartera[]) => {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            this.carteras = res;
            this.CloneCarteras = res;
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
          this.carteras = this.carteras.filter((item) => {
            return (item.numero.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        } else {
          this.carteras=this.CloneCarteras;
        }
  }
}
