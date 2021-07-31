import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RolService, Rol} from 'src/app/services/rol.service';

@Component({
  selector: 'app-modicar-rol',
  templateUrl: './modicar-rol.component.html',
  styleUrls: ['./modicar-rol.component.css'],
})
export class ModicarRolComponent implements OnInit {
  constructor(
    private rolservice: RolService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  rol!: Rol;
  editarrol= new FormGroup({
    Nombre_Rol:new FormControl(''),
    Descripcion:new FormControl('')
  });

  ngOnInit(): void {
    const id_entrada = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id de entrada' + id_entrada);
    if (id_entrada) {


      this.rolservice.getRol(id_entrada).subscribe(
        (res:any) => {
           this.rol=res[0];
           this.editarrol.setValue({
             'Nombre_Rol':this.rol.Nombre_Rol,
             'Descripcion':this.rol.Descripcion
           });
          console.log(this.editarrol.value);
        },
        (err) => console.log(err)
      );
    }
  }
  editrol() {
    this.rolservice.editRol(this.rol.Id_Rol!, this.rol).subscribe(
      res=>{
        console.log(res);
      },
      err=>console.log(err)
    );
    this.router.navigate(['/Usuario']);
  }
}
