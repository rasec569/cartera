import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-aporte',
  templateUrl: './detalle-aporte.component.html',
  styleUrls: ['./detalle-aporte.component.css']
})
export class DetalleAporteComponent implements OnInit {
  @Input() contratoid!:string;
  constructor() { }

  ngOnInit(): void {
  }


}
