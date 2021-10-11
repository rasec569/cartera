import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  formUser: FormGroup;
  constructor( private fb:FormBuilder,
    private autenticacionService: AutenticacionService,
    private _snackBar: MatSnackBar,
    private router: Router)
    {this.formUser=this.fb.group({
      Usuario:['', Validators.required],
      password:['', Validators.required]
    })
    if(localStorage.getItem('token')!=null){
      this.router.navigate(["dashboard"]);
    }
    }

  ngOnInit(): void {
  }
  ingresar() {
    this.autenticacionService.signin(this.formUser.value).subscribe(
      (res: any) => {
        if (res.token != null) {
          this.router.navigate(["dashboard"]);
        } else {
          this.error("Usurio o contraseña incorrecta", 'Error');
          this.formUser.reset();
        }
      },(err) => {
        console.log(err);
        this.error(
          "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          , "Error"
        );
      }
    );
  }
  error(Mensaje: string, Tipo:string) {
    this._snackBar.open(Mensaje, Tipo, {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }
  espera() {
    setTimeout(() => {
      this.router.navigate(["dashboard"]);
    }, 1500);
  }
}
