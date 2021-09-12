import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/GlobalService';
import { AlertService } from "../../_alert";
import { AdicionalService } from 'src/app/services/adicional.service';
import { adicional } from 'src/app/Models/adicional.model';


@Component({
  selector: 'app-card-adicional-list',
  templateUrl: './card-adicional-list.component.html',
  styleUrls: ['./card-adicional-list.component.css']
})
export class CardAdicionalListComponent implements OnInit {
  Adicional:adicional={
    id:"",
    concepto:"",
    valor:"",
    estado:"",
    fecha:"",
    idinmueble:"",
    TIPO:"",
    MENSAJE:""
  }
  @Input()
  inmueble:number=0;
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  ListAdicionale=[];
  ClonarListAdicionales=[];
  idOption:number=1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false,
  };
  constructor(private AdicionalS:AdicionalService,
    protected alertService: AlertService,
    private globalEvents: GlobalService) { }
    changeMode(option:number){
      this.idOption=option;
      if(option==1){
        /* this.ListarAdicionales(this.proyecto); */
      }
    }
  ngOnInit() {
  }
  public showModal = false;
  public toggleModal() {
  this.showModal = !this.showModal;
  }
  clearDataAdicional(){
    this.Adicional={
      id:"",
      concepto:"",
      valor:"",
      estado:"",
      fecha:"",
      idinmueble:"",
      TIPO:"",
      MENSAJE:"",
    }
  }
  validadorAdicional() {
    if (
      this.Adicional.concepto.trim() == ""
    ) {
      this.alertService.warn("Todos los campos deben estar diligenciados!", this.options);
      return false;
    }else{
      return true;
    }
  }
}
