import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from "moment";

import { AportesService } from 'src/app/services/aportes.service';
import { aporte } from 'src/app/Models/aporte.model';

import { CuotaService } from 'src/app/services/cuota.service';
import { cuota } from 'src/app/Models/cuota.model';

@Component({
  selector: 'app-form-aporte',
  templateUrl: './form-aporte.component.html',
  styleUrls: ['./form-aporte.component.css']
})
export class FormAporteComponent implements OnInit {
formAporte: FormGroup;
public listaCuotas:cuota[]=[];
public CloneCuotas:cuota[]=[];
saldo!:number;

  constructor(public _snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogoRef: MatDialogRef<FormAporteComponent>,
    public AportesS:AportesService,
    public CuotaS:CuotaService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.formAporte=this.fb.group({
        id: [""],
        numero: ["", Validators.required],
        concepto: ["", Validators.required],
        fecha: ["", Validators.required],
        referencia: ["", Validators.required],
        destino: [""],
        cuota:["", Validators.required],
        valor: ["", Validators.required],
        pagado: [""],
        cuotaid: [""],
      }/* ,{
        Validators: [this.valorValidador()]
    } */);

      console.log('data',data)
      if (this.data.aporteid === ""){
        if (this.data.numaporte != 0) {
          this.formAporte.controls["numero"].setValue(this.data.numaporte + 1);
        }else{
          this.QueryNumAporte(this.data.acuerdo);
        }
        if(this.data.cuota===""){
          this.QueryCuotas(this.data.acuerdo);
        }
        else{
          this.formAporte.controls['cuota'].setValue(this.data.cuota.numero);
          this.formAporte.controls['cuotaid']. setValue(this.data.cuota.id);
          this.formAporte.controls['valor'].setValue(this.data.cuota.valor-this.data.cuota.pagado);
          this.formAporte.controls['pagado'].setValue(this.data.cuota.pagado);
        }
      }
      else{
        this.QueryOneAporte(this.data.aporteid);
      }
     }

  ngOnInit(): void {
    /* if(this.data.acuerdo!=""){
      console.log("entro",this.data.acuerdo );

    } */
  }
  close() {
    this.dialogoRef.close();
  }

  filter(ev: any){
    const val = ev.target.value;
    console.log(val);
    if (val && val.trim() !== "") {
      this.listaCuotas = this.listaCuotas.filter((item) => {
        if(this.listaCuotas.length===1){
          this.formAporte.controls['cuota'].setValue(item.numero);
        }
        return item.numero.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.listaCuotas = this.CloneCuotas;
    }
  }
  clickseltec(event:any){
     this.formAporte.controls['cuota'].setValue(event.option.value);
    this.formAporte.controls['cuotaid']. setValue(event.option.id.id);
    this.formAporte.controls['valor'].setValue(event.option.id.valor-event.option.id.pagado);
    this.formAporte.controls['pagado'].setValue(event.option.id.pagado);
    this.saldo=event.option.id.valor-event.option.id.pagado;
  }
  QueryCuotas(acuerdoid:any) {
    try {
      this.CuotaS.getCuotasPendientesAcuerdo(acuerdoid).subscribe(
        (res: cuota[]) => {
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.listaCuotas = res;
            this.CloneCuotas=res;
          } else {
            this.notificacion(res[0].MENSAJE!);
          }
        },
        (err) => {
          this.notificacion(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"+err
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde! "+error
      );
    }
  }
  QueryNumAporte(acuerdoid: any) {
    console.log("se activo", acuerdoid)
    try {
      this.AportesS.getNumAporte(acuerdoid,"0").subscribe(
        (res: aporte[]) => {
          console.log(res);
          if (res[0].numero != null){
            console.log("entro",res[0]);
            if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
              this.formAporte.controls["numero"].setValue(res[0].numero+1);
            }
          }
          else {
            console.log("else",res[0]);
            this.formAporte.controls["numero"].setValue(1);
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
  /* public valorValidador():ValidatorFn{
    return (control:FormControl) => {
      const entrada:number = this.formAporte.value.valor;
      if(entrada>this.saldo) return {isValid:false};
      return null;
    };
  } */
  SaveAporte() {
    try {
      this.formAporte.value.fecha = moment(this.formAporte.value.fecha).format("YYYY-MM-DD");
      if (this.formAporte.value.id == null || this.formAporte.value.id == "") {
          this.AportesS.createAporteAcuerdo(this.formAporte.value).subscribe(
            (res: aporte[]) => {
              console.log(res);
              if (res[0].TIPO == "3") {
                this.dialogoRef.close();
                this.notificacion(res[0].MENSAJE!);
                this.formAporte.reset();
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
      } else {
        this.AportesS.updateAporte(this.formAporte.value).subscribe(
          (res: aporte[]) => {
            if (res[0].TIPO == "3") {
              this.dialogoRef.close();
              this.notificacion(res[0].MENSAJE!);
              this.formAporte.reset();
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
  QueryOneAporte(idaporte: any) {
    console.log("se activo", idaporte)
    try {
      this.AportesS.getAporte(idaporte).subscribe(
        (res: aporte[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formAporte.patchValue(res[0]);
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
  notificacion(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }
}
