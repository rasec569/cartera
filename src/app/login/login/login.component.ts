import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  validationLogin: boolean = false;
  ValidationMensage: string = "";

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(
              private fb:FormBuilder,
              private _snackBar:MatSnackBar
              , private router: Router)
  {
    this.form=this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }
  Ingresar(){
    this.validationLogin = false;
    this.ValidationMensage = "";
    const usuario=this.form.value.usuario;
    const password=this.form.value.password;
    /* this.autenticacionService.signin(this.Usuario).subscribe(
      (res: any) => {
        if (res.token != null) {
          localStorage.setItem("token", res.token);
          this.espera();
        } else {
          this.error('Usurio o contraseña incorrecta');
          this.Usuario.reset();
        }
      },
      (err) => {
        console.log(err)
        this.error('Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!');
      }
    ); */
  }
    error(Mensaje: string) {
      this._snackBar.open(Mensaje, 'Error', {
        duration:5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
    espera(){
      this.loading=true;
      setTimeout(() =>{
        this.router.navigate(['dashboard']);
      }, 1500);
    }
}
