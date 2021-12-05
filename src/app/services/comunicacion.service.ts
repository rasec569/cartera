import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  constructor() { }
  CargarAportes$=new EventEmitter<string>();
  CargarAportesAdicional$=new EventEmitter<string>();

  /* proyectoid!: string;
  private enviarProyectoSubject = new Subject<string>();
  enviarMensajeObservable = this.enviarProyectoSubject.asObservable();
  enviarMensaje(proyectoid: string) {
    this.proyectoid = proyectoid;
    this.enviarProyectoSubject.next(proyectoid);
  } */

}
