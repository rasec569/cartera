import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService } from "src/app/components/_alert";
import { AutenticacionService } from "src/app/services/autenticacion.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  Usuario = {
    Usuario: "",
    password: "",
  };
  validationLogin: boolean = false;
  ValidationMensage: string = "";
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router,
    protected alertService: AlertService
  ) {}

  ngOnInit(): void {}

  Login() {
    try {
      this.validationLogin = false;
      this.ValidationMensage = "";
      if (this.Usuario.Usuario == "" || this.Usuario.password == "") {
        this.alertService.error('Los campos de Correo/Contraseña no pueden ser nulos!', this.options);
      } else {
        this.autenticacionService.signin(this.Usuario).subscribe(
          (res: any) => {
            console.log(res);
            if (res.token != null) {
              localStorage.setItem("token", res.token);
              this.router.navigate(["/admin/dashboard"]);
            } else {
              this.alertService.error('Correo/Contraseña incorrectos!', this.options);
            }
          },
          (err) => {
            this.alertService.error('rror de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!', this.options);
          }
        );
      }
    } catch (error) {
      this.alertService.error('Error en el sistema, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!', this.options);
    }
  }
}
