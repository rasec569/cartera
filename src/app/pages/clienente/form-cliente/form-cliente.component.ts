import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router ,ActivatedRoute ,Params} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClientesService } from 'src/app/services/clientes.service';
import { cliente } from 'src/app/Models/cliente.model';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs-compat/operator/startWith';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {
  clienteid='';
  formCliente: FormGroup;
  public ListaClientes:cliente[]=[];
  filteredOptions!: Observable<cliente[]>;
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
        identificacion: ["", Validators.required],
        nombres: ["", Validators.required],
        apellidos: ["", Validators.required],
        correo: ["", Validators.required],
        telefono: ["", Validators.required],
        direccion: ["", Validators.required],
      })
      this.formCliente.get('nombres')?.valueChanges.subscribe(res=>{
        this.filter(res);
      })
     }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.clienteid = params.id;
    });
    if(this.clienteid != ""){
      this.QueryOneCliente(this.clienteid);
    }
    this.QuerClientes();

    /* this.filteredOptions=this.formCliente.controls.onValueChange.pipe(startWith(''),map(value=>this._filter(value))
    ); */
  }
  mostrar(subject: { nombres: any; }){
    return subject ? subject.nombres: undefined;
  }
  filter(value: string){
    console.log('valor input',value);
    this.ListaClientes=this.ListaClientes.filter(cliente =>{
      return cliente.nombres.toLowerCase().indexOf(value.toLowerCase())>-1
    })
  }
  filer2(value: string):cliente[]{
    const filterValue=value.toLowerCase();
    console.log('valor',filterValue);
    return this.ListaClientes.filter(cliente => cliente.nombres.toLowerCase().indexOf(filterValue) === 0);
  }
  QuerClientes() {
    try {
      this.ClienteS.getClientes().subscribe(
        (res: cliente[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.ListaClientes = res;
            /* this.filterData(res); */
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
