import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Usuario={
    Usuario:"Admin",
    password:"123"
  }
  constructor(
    private autenticacionService:AutenticacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  Login(){
    console.log(this.Usuario);
    this.autenticacionService.signin(this.Usuario).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem('token', res.token);
      this.router.navigate(['privado'])
    })
  }
}
