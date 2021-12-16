import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router ,ActivatedRoute ,Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { usuario } from 'src/app/Models/usuario.model';

import {rol} from 'src/app/Models/rol.model';
import { RolService } from 'src/app/services/rol.service';
import {area} from 'src/app/Models/area.model';
import { AreasService } from 'src/app/services/areas.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  userid='';
  formUser: FormGroup;
  public DataAreas!: any[];
  public DataRoles!: any[];
  // expacion
  panelOpenState = false;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  constructor(private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private UserS: UserService,
    private AreaS:AreasService,
    private RolS:RolService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.formUser = this.fb.group({
        iduser: [""],
        identificacion: ["", Validators.required,
        Validators.pattern('/^[1-9]\d{6,10}$/')],
        nombres: ["", Validators.required],
        apellidos: ["", Validators.required],
        nick: ["", Validators.required],
        password: ["", Validators.required],
        correo: ["", Validators.required, Validators.email],
        telefono: ["", Validators.required],
        direccion: ["", Validators.required],
        IdArea: ["", Validators.required],
        IdRol: ["", Validators.required],
      });
    }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userid = params.id;
    });
    if(this.userid != ""){
      this.QueryOneUsuario(this.userid);
    }
    this.listarArea();
    this.listarRol();
  }
  QueryOneUsuario(userid:any) {
    console.log("en el metodo", userid)
    try {
      this.UserS.getUsuario(userid).subscribe(
        (res: usuario[]) => {
          console.log(res[0]);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formUser.setValue(res[0]);
          } else {
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  SaveUsuario() {
    console.log("entro id",this.formUser.value.iduser);
    try {
      if((this.formUser.value.iduser== null) ||(this.formUser.value.iduser=="")){
        this.UserS.createUsuarrio(this.formUser.value).subscribe(
          (res: usuario[]) => {
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.formUser.reset();
              this.router.navigate(['Panel']);
            } else {
              this.notificacion(res[0].MENSAJE!);
            }
          },
          (err) => {
            this.notificacion(
              "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
            );
          }
        );
      }else{
        this.UserS.updateUsuario(this.formUser.value).subscribe(
          (res: usuario[]) => {
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.formUser.reset();
              this.router.navigate(['Panel']);
            } else {
              this.notificacion(res[0].MENSAJE!);
            }
          },
          (err) => {
            this.notificacion(
              "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
            );
          }
        );
      }
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  listarRol(){
    try {
      this.RolS.getRoles().subscribe(
        (res:rol[])=> {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            console.log('Lista para select 1',res);
            this.DataRoles=res;
          }else{
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  listarArea(){
    try {
      this.AreaS.getAreas().subscribe(
        (res:area[])=> {
          if(res[0].TIPO==undefined && res[0].MENSAJE==undefined){
            console.log('Lista para select 2',res)
            this.DataAreas=res;
          }else{
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
      );
    }
  }
  notificacion(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }

}
