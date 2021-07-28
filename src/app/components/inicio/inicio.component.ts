import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private userservice:UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.listarUsuario();
  }
  listarUsuario(){
    this.userservice.getUsuarios().subscribe(
      (res)=>{
        console.log('Res', res);
      });
  }

}
