import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router ,ActivatedRoute ,Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClientesService } from 'src/app/services/clientes.service';
import { cliente } from 'src/app/Models/cliente.model';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {
  clienteid='';
  formCliente: FormGroup;
  public ListaClientes:cliente[]=[];
  public CloneClientes:cliente[]=[];
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
    private route: ActivatedRoute,
    private router: Router,
    private ClienteS:ClientesService) {
      this.formCliente= this.fb.group({
        id: [""],
        identificacion: ["", Validators.required, Validators.pattern('/^[1-9]\d{6,10}$/')],
        nombres: ["", Validators.required],
        apellidos: ["", Validators.required],
        correo: ["", Validators.email],
        telefono: ["", Validators.required],
        direccion: ["", Validators.required],
      })
    }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.clienteid = params.id;
    });

    if(this.clienteid != ""){
      this.QueryOneCliente(this.clienteid);
    }
     if (this.clienteid === undefined){
      this.QuerClientes();
      /* this.formCliente.get('nombres')?.valueChanges.subscribe(res=>{
        this.filter(res);
      }) */
    }
  }
  mostrar(subject: { nombres: any; }){
    return subject ? subject.nombres: undefined;
  }
  filter(value: string){
    const val = value;
    if (val !== "") {
      this.ListaClientes=this.ListaClientes.filter(cliente =>{
        if(this.ListaClientes.length===1){
          this.clienteid = cliente.id;
          this.QueryOneCliente(cliente.id);
          this.ListaClientes = this.CloneClientes;
        }
        return cliente.nombres.toLowerCase().indexOf(val.toLowerCase())>-1
      })
    }
    else {
      this.ListaClientes = this.CloneClientes;
    }

  }
  getItems(ev: any){
    const val = ev.target.value;
    console.log(val);
    if (val && val.trim() !== "") {
      this.ListaClientes = this.ListaClientes.filter((item) => {
        if(this.ListaClientes.length===1){
          this.clienteid = item.id;
          this.QueryOneCliente(item.id);
        }
        return item.nombres.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.ListaClientes = this.CloneClientes;
    }
  }
  filter2(value: string):cliente[]{
    const filterValue=value.toLowerCase();
    console.log('valor',filterValue);
    return this.ListaClientes.filter(cliente => cliente.nombres.toLowerCase().indexOf(filterValue.toLowerCase()) >-1);
  }
  QuerClientes() {
    try {
      this.ClienteS.getClientes().subscribe(
        (res: cliente[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.ListaClientes = res;
            this.CloneClientes=res;
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
  QueryOneCliente(id:any) {
    try {
      console.log('entro a buscar');
      this.ClienteS.getCliente(id).subscribe(
        (res: cliente[]) => {
          console.log(res[0]);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.formCliente.setValue(res[0]);
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
  SaveCliente() {
    try {
      console.log('entro a guardar');
      if((this.formCliente.value.id== null) ||(this.formCliente.value.id=="")){
        this.ClienteS.createCliente(this.formCliente.value).subscribe(
          (res: cliente[]) => {
            console.log('entro a nuevo');
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.formCliente.reset();
              this.router.navigate(['Clientes']);
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
        this.ClienteS.updateCliente(this.formCliente.value).subscribe(
          (res: cliente[]) => {
            console.log('entro a editar');
            if (res[0].TIPO == "3") {
              this.notificacion(res[0].MENSAJE!);
              this.formCliente.reset();
              this.router.navigate(['Clientes']);
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
      this.formCliente.reset();
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
