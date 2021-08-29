import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  Login() {
    try {
      this.validationLogin = false;
      this.ValidationMensage = "";
      if (this.Usuario.Usuario == "" || this.Usuario.password == "") {
        this.validationLogin = true;
        this.ValidationMensage =
          "Los campos de Correo/Contraseña no pueden ser nulos!";
      } else {
        this.autenticacionService.signin(this.Usuario).subscribe(
          (res: any) => {
            console.log(res);
            if (res.token != null) {
              localStorage.setItem("token", res.token);
              this.router.navigate(["/admin/dashboard"]);
            } else {
              this.validationLogin = true;
              this.ValidationMensage = "Correo/Contraseña incorrectos!";
            }
          },
          (err) => {
            this.validationLogin = true;
            this.ValidationMensage =
              "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!";
          }
        );
      }
    } catch (error) {
      this.validationLogin = true;
      this.ValidationMensage =
        "Error en el sistema, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!";
    }
  }
}
