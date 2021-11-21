import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from "moment";

import { AportesService } from 'src/app/services/aportes.service';
import { aporte } from 'src/app/Models/aporte.model';

import { AdicionalService } from 'src/app/services/adicional.service';
import { adicional } from 'src/app/Models/adicional.model';

@Component({
  selector: 'app-form-aporte-adicional',
  templateUrl: './form-aporte-adicional.component.html',
  styleUrls: ['./form-aporte-adicional.component.css']
})
export class FormAporteAdicionalComponent implements OnInit {
  formAporte: FormGroup;
  public listaAdicionales:adicional[]=[];
  public CloneAdicionales:adicional[]=[];
  saldo!:number;

  constructor(public _snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogoRef: MatDialogRef<FormAporteAdicionalComponent>,
    public AportesS : AportesService,
    public AdicionalS : AdicionalService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.formAporte=this.fb.group({
        id: [""],
        numero: ["", Validators.required],
        concepto: ["", Validators.required],
        fecha: ["", Validators.required],
        referencia: ["", Validators.required],
        destino: [""],
        adicional: ["", Validators.required],
        valor: ["", Validators.required],
        pagado: [""],
        adicionalid: [""],
      });
      console.log("DAta",data)
      console.log("id",data.aporteid.length);
      if (data.aporteid === ""|| data.aporteid.length==0){
        if (this.data.numaporte != 0) {
          this.formAporte.controls["numero"].setValue(this.data.numaporte + 1);
        }else{
          console.log("Buscar num",this.data.adicional.contratoid);
          this.QueryNumAporte(this.data.adicional.contratoid);
        }
        if(data.contratoid!=""){
          console.log("lista adicionales",this.data.contratoid);
          this.QueryAdicionales(this.data.contratoid);
        }
        else{
          this.formAporte.controls['adicional'].setValue(this.data.adicional.concepto);
          this.formAporte.controls['adicionalid']. setValue(this.data.adicional.id);
          this.formAporte.controls['valor'].setValue(this.data.adicional.valor-this.data.adicional.pagado);
          this.formAporte.controls['pagado'].setValue(this.data.adicional.pagado);
        }
      }
      else{
        this.QueryOneAporte(this.data.aporteid);
      }
    }

  ngOnInit(): void {
    if(this.data.adicional!=""){


    }
  }
  close() {
    this.dialogoRef.close();
  }
  filter(ev: any){
    const val = ev.target.value;
    if (val && val.trim() !== "") {
      this.listaAdicionales = this.listaAdicionales.filter((item) => {
        if(this.listaAdicionales.length===1){
          this.formAporte.controls['adicional'].setValue(item.concepto);
          this.formAporte.controls['adicionalid']. setValue(item.id);
          this.formAporte.controls['valor']. setValue(parseInt(item.valor)-parseInt(item.pagado));
        }
        return item.concepto.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.listaAdicionales = this.CloneAdicionales;
    }
  }
  clickseletec(event:any){
    this.formAporte.controls['adicional'].setValue(event.option.value);
    this.formAporte.controls['adicionalid'].setValue(event.option.id.id);
    this.formAporte.controls['valor']. setValue(event.option.id.valor-event.option.id.pagado);
  }
  QueryAdicionales(contratoid:any) {
    try {
      this.AdicionalS.getAdicionalesContrato(contratoid).subscribe(
        (res: adicional[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.listaAdicionales = res;
            console.log(res);
            this.CloneAdicionales=res;
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
  QueryNumAporte(contratoid: any) {
    console.log("se activo", contratoid)
    try {
      this.AportesS.getNumAporte("0",contratoid).subscribe(
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
  SaveAporte() {
    try {
      this.formAporte.value.fecha = moment(this.formAporte.value.fecha).format( "YYYY-MM-DD" );
      if (this.formAporte.value.id == null || this.formAporte.value.id == "") {
          this.AportesS.createAporteAdicional(this.formAporte.value).subscribe(
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
