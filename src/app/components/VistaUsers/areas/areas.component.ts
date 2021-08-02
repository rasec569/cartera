import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AreasService, Area } from 'src/app/services/areas.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  constructor(private router: Router, private areaservice: AreasService) { }
  ListaArea:Area[]=[];

  ngOnInit(): void {
    this.listarArea();
  }
  listarArea(){
    this.areaservice.getAreas().subscribe(
      res=>{
        this.ListaArea=<any>res;
      },
      err=> console.log(err)
    );
  }

}
